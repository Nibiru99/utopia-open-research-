# ICS Experiment 2 — Equation Encoding with B3 Working Layout

## Purpose

Experiment 2 tests whether simple equations can be encoded as fragment loops inside the ICS-Math manifold and decoded back into standard notation.

The working layout is:

```text
B3 = B1 π-arc coordinate placement + B2 mirror-pair graph edges as metadata
```

This means coordinates stay semantically separated through π-arc family sectors, while positive/negative digit pairs keep direct mirror relationships through graph edges rather than forced coordinate movement.

## Scientific Boundary

ICS-Math is not treated as a replacement for arithmetic. It is tested as a geometric representation layer for symbols and equations.

## Symbol Families

This run uses the controlled math layer plus a necessary variable family for equation encoding:

- **numeric**: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -2, -3, -4, -5, -6, -7, -8, -9, +∞, -∞
- **variable**: a, b, c, x, y, r, E, m
- **operator**: +, -, ×, ÷, ^, √, log, ln, Σ, ∫, d/dx
- **relation**: =, ≈, <, >, ≤, ≥, →, ⇒
- **structure**: (), [], {}, vector, matrix, set
- **constant**: π, e, Φ, i
- **uncertainty**: X, Y, Ω, Ø

No observer, emotional, CLO, PAM, MPIF, or value-dynamics symbols were introduced.

## Test Equations

- `a + b = c` — symbolic relation with unresolved variables
- `x + 1 = 3` — bounded unknown with numeric constraint
- `x ^ 2 + y ^ 2 = r ^ 2` — metric equation loop with repeated operators and numbers
- `E = m c ^ 2` — physics-symbolic relation using variables and exponent

## Metrics

| Metric | Meaning |
|---|---|
| exact_decode | whether canonical coordinates decode back to original token sequence |
| decode_accuracy_noise | decoding accuracy after coordinate noise |
| loop_closure_score | whether explicit closure edge is geometrically reasonable |
| family_path_coherence | whether token-family sequence follows a simple math grammar |
| operator_relation_connectivity | whether operators and relation signs connect valid neighbors |
| ghost_core_alignment | whether numeric tokens preserve base-10 ghost reference |
| uncertainty_state | expected unresolved state; current valid unsolved equations should activate Y |
| pi_checksum_error | angular reconstruction error from stored π-arc coordinates |
| loop_length | total geometric length of the closed fragment loop |

## Results

| equation           | standard              |   n_tokens | decoded               | exact_decode   |   decode_accuracy_noise |   loop_closure_score |   family_path_coherence |   operator_relation_connectivity |   ghost_core_alignment | uncertainty_state   | expected_state   | state_match   |   pi_checksum_error |   loop_length |
|:-------------------|:----------------------|-----------:|:----------------------|:---------------|------------------------:|---------------------:|------------------------:|---------------------------------:|-----------------------:|:--------------------|:-----------------|:--------------|--------------------:|--------------:|
| E1_linear_symbolic | a + b = c             |          5 | a + b = c             | True           |                0.9976   |             1        |                       1 |                                1 |               1        | Y                   | Y                | True          |         1.41358e-17 |       4.97758 |
| E2_simple_solve    | x + 1 = 3             |          5 | x + 1 = 3             | True           |                0.996    |             1        |                       1 |                                1 |               0.919048 | Y                   | Y                | True          |         1.45775e-17 |       7.67208 |
| E3_pythagorean     | x ^ 2 + y ^ 2 = r ^ 2 |         11 | x ^ 2 + y ^ 2 = r ^ 2 | True           |                0.998545 |             0.921527 |                       1 |                                1 |               0.919048 | Y                   | Y                | True          |         6.42536e-18 |      15.4154  |
| E4_energy_mass     | E = m c ^ 2           |          6 | E = m c ^ 2           | True           |                0.995333 |             0.682612 |                       1 |                                1 |               0.919048 | Y                   | Y                | True          |         1.17798e-17 |       7.796   |

## Interpretation

### Primary Result

All four equations encode and decode successfully under the B3 layout.

The strongest result is that canonical equation loops can be reconstructed after coordinate noise with high accuracy.

### Uncertainty Result

All four equations activate `Y`, not `X`, `Ω`, or `Ø`.

This is correct because each equation is a structured known-unknown or symbolic relation rather than raw uncertainty, impossibility, or absence.

### Family Path Result

The simple equations show high family-path coherence. The most complex equation, `x ^ 2 + y ^ 2 = r ^ 2`, remains valid despite repeated operators and repeated numeric tokens.

### Ghost Core Result

Numeric symbols remain aligned with the base-10 ghost core, showing that equation encoding does not destroy the arithmetic reference layer.

### B3 Result

B3 is a valid working layout for equation encoding.

The most important architectural decision is confirmed:

```text
Coordinates should preserve semantic separation.
Mirror values should be represented as graph edges.
```

This avoids distorting the sphere while still preserving polarity relations.

## Pass / Partial / Fail

PASS condition:

```text
exact_decode = true
decode_accuracy_noise > 0.95
operator_relation_connectivity > 0.80
uncertainty_state matches expectation
```

Observed decision:

```text
Experiment 2 = PASS
```

## Recommended Next Step

Proceed to Experiment 3 — Equation Transformation.

First target:

```text
x + 1 = 3
→ x = 2
```

The transformation should test whether a loop can deform while preserving identity and reducing uncertainty.
