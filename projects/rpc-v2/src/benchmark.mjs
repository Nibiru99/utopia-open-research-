import { createHash } from "node:crypto";

function hashSeed(...parts) {
  const digest = createHash("sha256").update(parts.join(":"), "utf8").digest();
  return digest.readUInt32LE(0) || 1;
}

function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let x = state;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussianGenerator(random) {
  let spare = null;
  return () => {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }
    let u = 0;
    let v = 0;
    while (u === 0) u = random();
    while (v === 0) v = random();
    const radius = Math.sqrt(-2 * Math.log(u));
    const angle = 2 * Math.PI * v;
    spare = radius * Math.sin(angle);
    return radius * Math.cos(angle);
  };
}

function normalize(vector) {
  let sum = 0;
  for (const value of vector) sum += value * value;
  const norm = Math.sqrt(sum);
  if (!Number.isFinite(norm) || norm === 0) throw new Error("non-finite or zero vector norm");
  return vector.map((value) => value / norm);
}

function cosine(a, b) {
  let dot = 0;
  let aa = 0;
  let bb = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    aa += a[i] * a[i];
    bb += b[i] * b[i];
  }
  return dot / Math.sqrt(aa * bb);
}

function stateEntropy(a, b) {
  const weights = new Array(a.length);
  let total = 0;
  for (let i = 0; i < a.length; i += 1) {
    const weight = (a[i] + b[i]) ** 2;
    weights[i] = weight;
    total += weight;
  }
  if (total === 0) return 0;
  let entropy = 0;
  for (const weight of weights) {
    if (weight === 0) continue;
    const probability = weight / total;
    entropy -= probability * Math.log(probability);
  }
  return entropy;
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function quantile(values, probability) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * probability;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function summary(values) {
  return {
    mean: mean(values),
    median: median(values),
    q05: quantile(values, 0.05),
    q95: quantile(values, 0.95),
  };
}

function correlation(a, b) {
  if (a.length !== b.length || a.length < 3) return null;
  const meanA = mean(a);
  const meanB = mean(b);
  let numerator = 0;
  let varianceA = 0;
  let varianceB = 0;
  for (let i = 0; i < a.length; i += 1) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    numerator += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  const denominator = Math.sqrt(varianceA * varianceB);
  return denominator === 0 ? null : numerator / denominator;
}

function firstHeldThreshold(values, start, end, threshold, hold) {
  let run = 0;
  for (let index = start; index < end; index += 1) {
    run = values[index] >= threshold ? run + 1 : 0;
    if (run >= hold) return index - hold + 1;
  }
  return null;
}

function makeInputs(seed, model) {
  const random = rng(hashSeed("rpc-v2", seed, "paired-inputs"));
  const gaussian = gaussianGenerator(random);
  const vector = () => normalize(Array.from({ length: model.dimension }, gaussian));
  const initialH = vector();
  const initialA = vector();
  const perturbationA = vector();
  const noiseH = new Float64Array(model.steps * model.dimension);
  const noiseA = new Float64Array(model.steps * model.dimension);
  for (let index = 0; index < noiseH.length; index += 1) {
    noiseH[index] = gaussian();
    noiseA[index] = gaussian();
  }
  return { initialH, initialA, perturbationA, noiseH, noiseA };
}

function shuffled(values, seed) {
  const result = [...values];
  const random = rng(hashSeed("rpc-v2", seed, "schedule-shuffle"));
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function simulate({ arm, seed, config, inputs, schedule = null, fixedAlpha = null }) {
  const { model } = config;
  let h = [...inputs.initialH];
  let a = [...inputs.initialA];
  const coherence = new Array(model.steps);
  const entropy = new Array(model.steps);
  const alphaTrace = new Array(model.steps);
  const noiseMultiplier = arm === "dynamic_dt_noise"
    ? model.noise_scale * model.dt
    : model.noise_scale * Math.sqrt(model.dt);

  for (let step = 0; step < model.steps; step += 1) {
    if (step === model.perturbation_step) a = [...inputs.perturbationA];
    const x = cosine(h, a);
    coherence[step] = x;
    entropy[step] = stateEntropy(h, a);

    let alpha;
    if (arm === "uncoupled") alpha = 0;
    else if (arm === "matched_fixed") alpha = fixedAlpha;
    else if (arm === "shuffled_schedule") alpha = schedule[step];
    else if (arm === "repulsive") alpha = -sigmoid(model.coupling_k * x);
    else alpha = sigmoid(model.coupling_k * x);
    alphaTrace[step] = alpha;

    if (step === model.steps - 1) continue;
    const nextH = new Array(model.dimension);
    const nextA = new Array(model.dimension);
    const noiseOffset = step * model.dimension;
    for (let dimension = 0; dimension < model.dimension; dimension += 1) {
      const difference = h[dimension] - a[dimension];
      nextH[dimension] = h[dimension]
        - model.dt * alpha * difference
        + noiseMultiplier * inputs.noiseH[noiseOffset + dimension];
      nextA[dimension] = a[dimension]
        + model.dt * alpha * difference
        + noiseMultiplier * inputs.noiseA[noiseOffset + dimension];
    }
    h = normalize(nextH);
    a = normalize(nextA);
  }

  const initialThreshold = firstHeldThreshold(
    coherence,
    0,
    model.perturbation_step,
    model.coherence_threshold,
    model.threshold_hold_steps,
  );
  const recovery = firstHeldThreshold(
    coherence,
    model.perturbation_step,
    model.steps,
    model.coherence_threshold,
    model.threshold_hold_steps,
  );

  return {
    arm,
    coherence,
    entropy,
    alphaTrace,
    metrics: {
      initial_cosine: coherence[0],
      auc: mean(coherence),
      pre_perturbation_auc: mean(coherence.slice(0, model.perturbation_step)),
      post_perturbation_auc: mean(coherence.slice(model.perturbation_step)),
      initial_threshold_step: initialThreshold,
      recovered: recovery !== null,
      recovery_steps: recovery === null ? null : recovery - model.perturbation_step,
    },
  };
}

function entropyCurvatureDiagnostic(simulation, seed, config) {
  const { coherence, entropy } = simulation;
  const { surrogate, model } = config;
  const entropyDelta = [];
  const negativeCurvature = [];
  for (let step = 2; step < coherence.length; step += 1) {
    const excluded = step >= model.perturbation_step - surrogate.exclude_steps_before_perturbation
      && step <= model.perturbation_step + surrogate.exclude_steps_after_perturbation;
    if (excluded) continue;
    entropyDelta.push(entropy[step] - entropy[step - 1]);
    negativeCurvature.push(-(coherence[step] - 2 * coherence[step - 1] + coherence[step - 2]));
  }
  const observed = correlation(entropyDelta, negativeCurvature);
  const random = rng(hashSeed("rpc-v2", seed, "circular-surrogate"));
  const minShift = Math.floor(negativeCurvature.length * surrogate.minimum_circular_shift_fraction);
  const maxShift = Math.floor(negativeCurvature.length * surrogate.maximum_circular_shift_fraction);
  const shift = minShift + Math.floor(random() * Math.max(1, maxShift - minShift));
  const shifted = negativeCurvature.map((_, index) => negativeCurvature[(index + shift) % negativeCurvature.length]);
  return {
    observed_correlation: observed,
    surrogate_correlation: correlation(entropyDelta, shifted),
    circular_shift: shift,
    points: entropyDelta.length,
  };
}

function armSummary(rows, arm) {
  const selected = rows.map((row) => row.arms[arm]);
  const recovered = selected.filter((item) => item.recovered);
  return {
    auc: summary(selected.map((item) => item.auc)),
    initial_cosine: summary(selected.map((item) => item.initial_cosine)),
    initial_threshold_rate: selected.filter((item) => item.initial_threshold_step !== null).length / selected.length,
    recovery_rate: recovered.length / selected.length,
    recovery_steps: recovered.length ? summary(recovered.map((item) => item.recovery_steps)) : null,
  };
}

export function runBenchmark(config) {
  const rows = [];
  const seedEnd = config.seeds.start + config.seeds.count;
  for (let seed = config.seeds.start; seed < seedEnd; seed += 1) {
    const inputs = makeInputs(seed, config.model);
    const dynamic = simulate({ arm: "dynamic", seed, config, inputs });
    const fixedAlpha = mean(dynamic.alphaTrace);
    const schedule = shuffled(dynamic.alphaTrace, seed);
    const simulations = {
      dynamic,
      uncoupled: simulate({ arm: "uncoupled", seed, config, inputs }),
      matched_fixed: simulate({ arm: "matched_fixed", seed, config, inputs, fixedAlpha }),
      shuffled_schedule: simulate({ arm: "shuffled_schedule", seed, config, inputs, schedule }),
      repulsive: simulate({ arm: "repulsive", seed, config, inputs }),
      dynamic_dt_noise: simulate({ arm: "dynamic_dt_noise", seed, config, inputs }),
    };
    rows.push({
      seed,
      fixed_alpha: fixedAlpha,
      diagnostic: entropyCurvatureDiagnostic(dynamic, seed, config),
      arms: Object.fromEntries(Object.entries(simulations).map(([name, value]) => [name, value.metrics])),
    });
  }

  const arms = Object.fromEntries(config.arms.map((arm) => [arm, armSummary(rows, arm)]));
  const paired = (left, right) => rows.map((row) => row.arms[left].auc - row.arms[right].auc);
  const h1Value = median(paired("dynamic", "uncoupled"));
  const h2Value = arms.dynamic.recovery_rate - arms.uncoupled.recovery_rate;
  const h3Value = median(paired("dynamic", "matched_fixed"));
  const observed = rows.map((row) => row.diagnostic.observed_correlation);
  const surrogate = rows.map((row) => row.diagnostic.surrogate_correlation);
  const h4Value = median(observed) - median(surrogate);
  const h5Value = Math.abs(median(paired("dynamic", "dynamic_dt_noise")));
  const h = config.hypotheses;
  const hypotheses = [
    { id: "H1_dynamic_auc_advantage", class: h.H1_dynamic_auc_advantage.class, value: h1Value, threshold: h.H1_dynamic_auc_advantage.minimum_median_paired_difference, comparator: ">=", pass: h1Value >= h.H1_dynamic_auc_advantage.minimum_median_paired_difference },
    { id: "H2_dynamic_recovery_rate_advantage", class: h.H2_dynamic_recovery_rate_advantage.class, value: h2Value, threshold: h.H2_dynamic_recovery_rate_advantage.minimum_rate_difference, comparator: ">=", pass: h2Value >= h.H2_dynamic_recovery_rate_advantage.minimum_rate_difference },
    { id: "H3_dynamic_vs_fixed_auc", class: h.H3_dynamic_vs_fixed_auc.class, value: h3Value, threshold: h.H3_dynamic_vs_fixed_auc.minimum_median_paired_difference, comparator: ">=", pass: h3Value >= h.H3_dynamic_vs_fixed_auc.minimum_median_paired_difference },
    { id: "H4_entropy_curvature_beyond_surrogate", class: h.H4_entropy_curvature_beyond_surrogate.class, value: h4Value, threshold: h.H4_entropy_curvature_beyond_surrogate.minimum_median_correlation_advantage, comparator: ">=", pass: h4Value >= h.H4_entropy_curvature_beyond_surrogate.minimum_median_correlation_advantage },
    { id: "H5_noise_scaling_sensitivity", class: h.H5_noise_scaling_sensitivity.class, value: h5Value, threshold: h.H5_noise_scaling_sensitivity.maximum_absolute_median_auc_difference, comparator: "<=", pass: h5Value <= h.H5_noise_scaling_sensitivity.maximum_absolute_median_auc_difference },
  ];
  return {
    schema_version: "1.0.0",
    experiment: config.experiment,
    evidence_scope: "deterministic synthetic coupled-state benchmark",
    interpretation_boundary: config.interpretation_boundary,
    seed_range: { start: config.seeds.start, end_exclusive: seedEnd, count: config.seeds.count },
    arms,
    entropy_curvature: {
      observed_correlation: summary(observed),
      circular_surrogate_correlation: summary(surrogate),
      median_advantage: h4Value,
    },
    hypotheses,
    primary_contract_pass: hypotheses.filter((item) => item.class === "primary").every((item) => item.pass),
    full_contract_pass: hypotheses.every((item) => item.pass),
    seed_rows: rows,
  };
}

export function initialCosines(config, count = 100) {
  return Array.from({ length: count }, (_, seed) => {
    const inputs = makeInputs(seed, config.model);
    return cosine(inputs.initialH, inputs.initialA);
  });
}
