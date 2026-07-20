# RPC v2 confirmatory result

## Provenance

- design-freeze commit: `36be4b796e9e417b5eeca61d5873f8f6447b1dab`
- configuration: `config/confirmatory-v2.0.0.json`
- seed range: integers 0–199
- runtime: Node.js `v24.14.0`
- dependencies: none
- commands: `npm test`, then `npm run rpc:run`
- clean-checkout tests: 4 passed
- deterministic rerun: byte-identical JSON and CSV

## Contract outcome

| ID | Frozen test | Value | Threshold | Outcome |
|---|---|---:|---:|---|
| H1 | dynamic minus uncoupled median AUC | `0.897934` | at least `0.20` | pass |
| H2 | dynamic minus uncoupled recovery-rate difference | `1.0` | at least `0.50` | pass |
| H3 | dynamic minus matched-fixed median AUC | `-0.024494` | at least `0.02` | **fail** |
| H4 | entropy–curvature correlation advantage over surrogate | `0.006817` | at least `0.05` | **fail** |
| H5 | absolute median AUC change under noise-scaling sensitivity | `0.002835` | at most `0.05` | pass |

The primary contract passed. The full contract failed.

## Main summaries

| Arm | Median AUC | Recovery rate | Median recovery steps |
|---|---:|---:|---:|
| dynamic | `0.894362` | `1.0` | `92` |
| uncoupled | `-0.007514` | `0.0` | — |
| matched fixed | `0.919548` | `1.0` | `80` |
| shuffled schedule | `0.919759` | `1.0` | `80` |
| repulsive | `-0.621835` | `0.0` | — |
| dynamic with original `dt` noise scaling | `0.898810` | `1.0` | `91` |

## Interpretation

Attractive coupling produces convergence and perturbation recovery in this declared synthetic system relative to an uncoupled control. It does **not** show that dynamic coupling is better than a simpler fixed coupling. It also provides no support for the proposed entropy–curvature law beyond the declared surrogate. These negative diagnostics narrow the engineering contribution and must remain visible in any manuscript or Zenodo update.

No result here establishes emotion, consciousness, quantum behavior, clinical performance, or physical entropy.
