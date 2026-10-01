# ICS Experiment 4 — X/Y/Ω/Ø Ambiguity Test

## Purpose

Experiment 4 tests whether the B3 ICS-Math working layout can distinguish different epistemic and symbolic states:

```text
Y  = known unknown / bounded ambiguity
X  = unknown unknown / raw uncertainty
Ω  = impossibility / undefined / indeterminate transition
Ø  = true absence / non-participating null field
Y→i = domain-extension-needed case
SOLVED = arithmetic certainty control
```

The working layout remains:

```text
B3 = π-arc family-sector coordinates + mirror-pair graph metadata
```

## Scientific Boundary

ICS-Math is tested here as a geometric representation layer for mathematical symbols and ambiguity states. This test does not claim a replacement for arithmetic.

## Test Expressions

- `x + 1 = 5` expected `Y`
- `x + ? = 5` expected `X`
- `x ÷ 0` expected `Ω`
- `0 ÷ 0` expected `Ω`
- `+∞ - +∞` expected `Ω`
- `√ -1` expected `Y_DOMAIN_EXTENSION`
- `Ø` expected `Ø`
- `2 + 3 = 5` expected `SOLVED`
- `1 ÷ x` expected `Y`

## Overall Result

```json
{
  "n_tests": 9,
  "classification_accuracy": 1.0,
  "min_decode_accuracy_noise": 0.9744,
  "mean_decode_accuracy_noise": 0.992977777777778,
  "mean_pi_checksum_error": 5.4318114930344e-18,
  "mean_family_path_coherence": 1.0,
  "decision": "PASS"
}
```

## Metrics

| test_id                    | expression   | expected_state     | predicted_state    | state_match   | reason                                                                |   ambiguity_score |   decode_accuracy_noise |   family_path_coherence |   operator_relation_connectivity |   ghost_core_alignment |   pi_checksum_error |
|:---------------------------|:-------------|:-------------------|:-------------------|:--------------|:----------------------------------------------------------------------|------------------:|------------------------:|------------------------:|---------------------------------:|-----------------------:|--------------------:|
| A1_bounded_unknown         | x + 1 = 5    | Y                  | Y                  | True          | structured known-unknown / bounded equation context                   |              0.6  |                0.9808   |                       1 |                                1 |               0.866667 |         1.63445e-17 |
| A2_raw_unknown_marker      | x + ? = 5    | X                  | X                  | True          | raw unknown / untyped uncertainty present                             |              1    |                0.9856   |                       1 |                                1 |               0.761905 |         1.59028e-17 |
| A3_division_by_zero        | x ÷ 0        | Ω                  | Ω                  | True          | division by zero undefined                                            |              1    |                0.998667 |                       1 |                                1 |               0.97619  |         0           |
| A4_zero_over_zero          | 0 ÷ 0        | Ω                  | Ω                  | True          | 0 ÷ 0 indeterminate singularity                                       |              1    |                0.998667 |                       1 |                                1 |               0.97619  |         0           |
| A5_infinity_minus_infinity | +∞ - +∞      | Ω                  | Ω                  | True          | infinity subtraction/collision is indeterminate without limit context |              1    |                0.998667 |                       1 |                                1 |               1        |         0           |
| A6_sqrt_negative_one       | √ -1         | Y_DOMAIN_EXTENSION | Y_DOMAIN_EXTENSION | True          | real-domain invalid, complex-domain extension needed                  |              0.45 |                1        |                       1 |                                1 |               1        |         0           |
| A7_absence                 | Ø            | Ø                  | Ø                  | True          | true absence / non-participating null field                           |              0    |                1        |                       1 |                                1 |               1        |         0           |
| A8_solved_control          | 2 + 3 = 5    | SOLVED             | SOLVED             | True          | arithmetic certainty control                                          |              0.05 |                0.9744   |                       1 |                                1 |               0.849206 |         1.59028e-17 |
| A9_conditional_denominator | 1 ÷ x        | Y                  | Y                  | True          | bounded conditional uncertainty                                       |              0.6  |                1        |                       1 |                                1 |               0.971429 |         7.3624e-19  |

## Interpretation

### Primary Result

The ambiguity classifier correctly separated all tested cases.

The key distinction was preserved:

```text
0      ≠ Ø
Y      ≠ X
Y      ≠ Ω
Ω      ≠ Ø
sqrt(-1) in real domain ≠ pure impossibility
```

### Important Finding: sqrt(-1)

`√ -1` was not classified as simple impossibility. It was classified as:

```text
Y_DOMAIN_EXTENSION
```

Meaning:

```text
invalid in the current real-number domain,
but resolvable through complex-domain extension via i.
```

This is a useful result because it prevents the model from collapsing all unfamiliar cases into Ω.

### Important Finding: x + ? = 5

`x + ? = 5` activated X because `?` is untyped raw unknown.

By contrast:

```text
x + 1 = 5
```

activated Y because the unknown is bounded by equation structure.

### Important Finding: Ø

`Ø` remained separate from `0`.

This supports one of the strongest ICS-Math claims:

```text
zero, absence, impossibility, and uncertainty are different states.
```

## Pass / Partial / Fail

PASS condition:

```text
classification_accuracy = 1.0
min_decode_accuracy_noise > 0.95
X/Y/Ω/Ø remain separated
sqrt(-1) does not collapse into pure Ω
```

Observed decision:

```text
Experiment 4 = PASS
```

## Recommended Next Step

Proceed to Experiment 5 — Base-10 Ghost Core Benchmark.

That test should compare conventional notation, ghost-core notation, and ICS-Math notation on:

```text
encoding cost
retrieval stability
ambiguity detection
transformation clarity
symbol collision
compute load
```

A later branch should run the geometric imprint cache test:

```text
Can a complex equation imprint be stored and reused with less recomputation?
```
