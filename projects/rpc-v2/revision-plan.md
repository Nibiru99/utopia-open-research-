# RPC v2 synthetic benchmark design

**Status:** configuration and analysis frozen at public commit `36be4b796e9e417b5eeca61d5873f8f6447b1dab`; confirmatory seed range executed twice with byte-identical outputs.

## Question

For two normalized state vectors under an explicitly coupled stochastic rule, which convergence and perturbation-recovery behaviors are caused by coupling rather than initialization, normalization, or shared-trajectory artifacts?

For unit vectors `h_t` and `a_t`, the observable is:

```text
X_t = dot(h_t, a_t) / (norm(h_t) * norm(a_t))
```

The symmetric update is:

```text
h_(t+1) = norm(h_t - dt * alpha_t * (h_t - a_t) + epsilon_h_t)
a_(t+1) = norm(a_t + dt * alpha_t * (h_t - a_t) + epsilon_a_t)
```

Cosine similarity is a computational observable only; no affective or conscious interpretation is inferred.

## Frozen configuration

- dimensions: 32
- steps: 1,000
- perturbation step: 500
- `dt`: 0.01
- nominal noise: 0.02
- seeds: integers 0–199
- independent zero-mean Gaussian initial states, then normalized
- paired initial states and stochastic inputs across arms
- canonical JSON result and per-seed CSV

The configuration and acceptance criteria were committed before the first confirmatory run and were not changed after observation.

## Frozen arms

1. dynamic sigmoid coupling;
2. uncoupled control;
3. matched fixed coupling using each seed's mean dynamic schedule;
4. shuffled dynamic coupling schedule;
5. repulsive coupling;
6. dynamic coupling with the original `dt` noise scaling as a sensitivity arm.

## Endpoints and rules

Primary endpoints are median paired coherence-AUC advantage over uncoupled and recovery-rate advantage after perturbation. Diagnostics compare dynamic with matched fixed coupling and entropy–curvature correlation with a deterministic circular-shift surrogate. The noise-scaling arm is a sensitivity check.

The seed count is fixed, comparisons are paired, optional stopping is prohibited, and failures and null results remain in the output.

## Outcome

The primary contract passed, but the full contract failed. Dynamic coupling separated from the uncoupled arm and recovered after every perturbation. Matched fixed coupling had higher median AUC and faster recovery, so the adaptive-advantage diagnostic failed. The entropy–curvature correlation did not exceed its frozen surrogate threshold. See [results/README.md](results/README.md).

The outcome describes this synthetic system only. It does not demonstrate consciousness, human affect, quantum tunneling, clinical value, or physical entropy.
