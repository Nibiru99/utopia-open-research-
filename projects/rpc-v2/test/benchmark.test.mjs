import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { initialCosines, runBenchmark } from "../src/benchmark.mjs";

const config = JSON.parse(await readFile(new URL("../config/confirmatory-v2.0.0.json", import.meta.url), "utf8"));

function smallConfig() {
  return {
    ...config,
    seeds: { start: 0, count: 4 },
    model: {
      ...config.model,
      dimension: 8,
      steps: 120,
      perturbation_step: 60,
      coherence_threshold: 0.7,
      threshold_hold_steps: 3,
    },
    surrogate: {
      ...config.surrogate,
      exclude_steps_before_perturbation: 2,
      exclude_steps_after_perturbation: 4,
    },
  };
}

test("the benchmark is byte-structure deterministic for a fixed config", () => {
  assert.deepEqual(runBenchmark(smallConfig()), runBenchmark(smallConfig()));
});

test("zero-mean independent initialization is not positively biased", () => {
  const values = initialCosines(config, 200);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  assert.ok(Math.abs(mean) < 0.05, `mean initial cosine was ${mean}`);
});

test("all declared arms and seed rows are emitted", () => {
  const result = runBenchmark(smallConfig());
  assert.equal(result.seed_rows.length, 4);
  assert.deepEqual(Object.keys(result.arms), config.arms);
  assert.equal(result.hypotheses.length, 5);
  assert.equal(typeof result.primary_contract_pass, "boolean");
  assert.equal(typeof result.full_contract_pass, "boolean");
});

test("paired arms share identical initial states", () => {
  const result = runBenchmark(smallConfig());
  for (const row of result.seed_rows) {
    const initial = config.arms.map((arm) => row.arms[arm].initial_cosine);
    assert.equal(new Set(initial).size, 1);
  }
});
