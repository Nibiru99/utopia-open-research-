# ICS Experiment 5 — Base-10 Ghost Core Benchmark

## Purpose

Experiment 5 compares three representations:

```text
A: Conventional string notation
B: Base-10 ghost core
C: ICS-Math B3 loop representation
```

The aim is not to prove that ICS-Math replaces arithmetic. The aim is to test whether the B3 symbolic equation manifold adds measurable structure over normal notation and the base-10 ghost reference.

## Working Layout

```text
B3 = π-arc family-sector coordinates + mirror-pair graph metadata
```

The ghost core remains a validation/control layer.

## Test Categories

### Expression tests

- `x + 1 = 3` expected `Y`
- `x + ? = 5` expected `X`
- `0 ÷ 0` expected `Ω`
- `+∞ - +∞` expected `Ω`
- `√ -1` expected `Y_DOMAIN_EXTENSION`
- `Ø` expected `Ø`
- `2 + 3 = 5` expected `SOLVED`
- `x ^ 2 + y ^ 2 = r ^ 2` expected `Y`
- `E = m c ^ 2` expected `Y`

### Transformation tests

- `x + 1 = 3 → x = 2`
- `a + b = c → a = c - b`
- `E = m c ^ 2 → c = √(E ÷ m)`
- `x ^ 2 + y ^ 2 = r ^ 2 → r = √(x ^ 2 + y ^ 2)`

## Metrics

| Metric | Meaning |
|---|---|
| coverage | how much of the expression is representable |
| retrieval_stability | reconstruction accuracy under representation-specific noise |
| ambiguity_detection | whether X/Y/Ω/Ø/SOLVED/domain-extension state is detected |
| symbol_conflict_rate | unsupported or colliding representation rate |
| family_structure_score | whether symbol-family structure is preserved |
| loop_or_topology_score | whether representation has explicit loop/topology |
| compute_cost | toy cost estimate for encoding/evaluation |
| transform_clarity | whether transformation remains interpretable |
| identity_preservation | whether source/target preserve mathematical identity markers |
| uncertainty_reduction | whether transformation reduces uncertainty |
| overall_score | weighted benchmark score |

## Overall Summary

| representation        |   coverage |   retrieval_stability |   ambiguity_detection |   symbol_conflict_rate |   compute_cost |   family_structure_score |   loop_or_topology_score |   expression_score |   transform_clarity |   identity_preservation |   uncertainty_reduction |   target_compute_cost |   compute_cost_delta |   transformation_score |   overall_score |   decision |
|:----------------------|-----------:|----------------------:|----------------------:|-----------------------:|---------------:|-------------------------:|-------------------------:|-------------------:|--------------------:|------------------------:|------------------------:|----------------------:|---------------------:|-----------------------:|----------------:|-----------:|
| C_ICS_B3_loop         |   1        |              0.995345 |              1        |               0.115825 |        9.64444 |                 1        |                 0.941593 |           0.961106 |           0.669746  |                0.9      |                       0 |               14.5    |               0.425  |               0.582307 |        0.790646 |          1 |
| A_conventional_string |   1        |              0.988707 |              1        |               0        |       11.2056  |                 0.5      |                 0        |           0.8302   |           0.297917  |                0.9      |                       0 |               16.2    |               0.4875 |               0.461715 |        0.664382 |          2 |
| B_base10_ghost_core   |   0.385859 |              0.383929 |              0.666667 |               0.614141 |       11.3278  |                 0.285051 |                 0.1      |           0.415915 |           0.0920833 |                0.144924 |                       0 |               20.9375 |               2.2625 |               0.185997 |        0.312452 |          3 |

## Expression Summary

| representation        |   coverage |   retrieval_stability |   ambiguity_detection |   symbol_conflict_rate |   compute_cost |   family_structure_score |   loop_or_topology_score |   expression_score |
|:----------------------|-----------:|----------------------:|----------------------:|-----------------------:|---------------:|-------------------------:|-------------------------:|-------------------:|
| A_conventional_string |   1        |              0.988707 |              1        |               0        |       11.2056  |                 0.5      |                 0        |           0.8302   |
| B_base10_ghost_core   |   0.385859 |              0.383929 |              0.666667 |               0.614141 |       11.3278  |                 0.285051 |                 0.1      |           0.415915 |
| C_ICS_B3_loop         |   1        |              0.995345 |              1        |               0.115825 |        9.64444 |                 1        |                 0.941593 |           0.961106 |

## Transformation Summary

| representation        |   transform_clarity |   identity_preservation |   uncertainty_reduction |   target_compute_cost |   compute_cost_delta |   transformation_score |
|:----------------------|--------------------:|------------------------:|------------------------:|----------------------:|---------------------:|-----------------------:|
| A_conventional_string |           0.297917  |                0.9      |                       0 |               16.2    |               0.4875 |               0.461715 |
| B_base10_ghost_core   |           0.0920833 |                0.144924 |                       0 |               20.9375 |               2.2625 |               0.185997 |
| C_ICS_B3_loop         |           0.669746  |                0.9      |                       0 |               14.5    |               0.425  |               0.582307 |

## Interpretation

### Conventional string notation

String notation remains very strong for direct human-readable expression and exact symbolic storage.

Its weakness in this benchmark is that it has no built-in geometry, no family-sector map, and no native fragment-loop topology.

### Base-10 ghost core

The ghost core performs exactly as expected: it is useful as a calibration layer for numeric order and base-10 reference, but it is not sufficient as a full symbolic equation manifold.

This validates the decision to keep it as a ghost/control layer rather than making it the active representation.

### ICS-Math B3

B3 performs best overall in this toy benchmark because it preserves:

```text
symbol coverage
retrieval stability
ambiguity detection
family structure
loop topology
transformation clarity
```

The result supports the current architecture:

```text
π-arc coordinates handle family-sector validity.
mirror edges handle polarity.
fragment loops handle equation structure.
ghost core handles base-10 validation.
```

## Important Boundary

The compute-cost estimates are toy estimates, not hardware measurements.

Experiment 5 does not yet prove that ICS-Math computes complex algebra faster.

It does support the claim that ICS-Math gives equations more reusable structure than flat strings or the base-10 ghost core alone.

## Result

```text
Best overall representation: C_ICS_B3_loop
Decision: PASS for B3 as a symbolic-geometric representation layer
```

## Recommended Next Step

Proceed to Experiment 6 — Fragment Loop Retrieval.

Target example:

```text
partial: x ^ 2 + y ^ 2 = ?
retrieve: x ^ 2 + y ^ 2 = r ^ 2
```

This will test whether geometric loop structure improves associative recovery and memory-like retrieval.
