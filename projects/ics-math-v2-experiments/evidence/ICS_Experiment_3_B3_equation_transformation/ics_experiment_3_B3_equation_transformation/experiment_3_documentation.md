# ICS Experiment 3 — Equation Transformation with B3 Working Layout

## Purpose

Experiment 3 tests whether equation fragment loops can be transformed while preserving identity, reducing uncertainty, and staying decodable.

The working layout remains:

```text
B3 = B1 π-arc coordinate placement + B2 mirror-pair graph metadata
```

Coordinates preserve semantic separation. Mirror values remain graph metadata instead of forced coordinate movement.

## Scientific Boundary

ICS-Math is still treated as a geometric representation layer for symbols and equations. This experiment does not claim a replacement for arithmetic.

## Tested Transformations

- **T1_simple_solve**: `x + 1 = 3 → x = 2`
- **T2_symbolic_rearrange**: `a + b = c → a = c - b`
- **T3_energy_rearrange**: `E = m c ^ 2 → c = √(E ÷ m)`
- **T4_pythagorean_solve_r**: `x ^ 2 + y ^ 2 = r ^ 2 → r = √(x ^ 2 + y ^ 2)`

## Metrics

| Metric | Meaning |
|---|---|
| exact_decode | whether each step decodes back into its original token sequence |
| decode_accuracy_noise | nearest-symbol recovery after coordinate noise |
| loop_closure_score | geometric reasonableness of closed fragment loop |
| family_path_coherence | token-family sequence validity |
| operator_relation_connectivity | operator and relation neighbor validity |
| ghost_core_alignment | preservation of base-10 numeric reference |
| uncertainty_score | X/Y/SOLVED-style uncertainty measure |
| coherence_score | weighted composite of decode, grammar, ghost, and loop scores |
| compute_load_est | toy computational load estimate |
| CEI | coherence-efficiency index across transformations |

## Transformation Summary

| transformation         | title                                        | source                | target                  | all_exact_decode   |   min_decode_accuracy_noise |   uncertainty_reduction_total |   coherence_change_total |   compression_total |   compute_load_change |   mean_CEI |   target_identity_preservation |   target_loop_closure_score | decision   |
|:-----------------------|:---------------------------------------------|:----------------------|:------------------------|:-------------------|----------------------------:|------------------------------:|-------------------------:|--------------------:|----------------------:|-----------:|-------------------------------:|----------------------------:|:-----------|
| T1_simple_solve        | x + 1 = 3 → x = 2                            | x + 1 = 3             | x = 2                   | True               |                    0.9944   |                          0.55 |               -0.09936   |           0.4       |                 -0.85 |  0.739636  |                            0.8 |                    1        | PASS       |
| T2_symbolic_rearrange  | a + b = c → a = c - b                        | a + b = c             | a = c - b               | True               |                    0.996    |                          0.25 |               -0.00072   |           0         |                  0.9  |  0.276978  |                            1   |                    1        | PASS       |
| T3_energy_rearrange    | E = m c ^ 2 → c = √(E ÷ m)                   | E = m c ^ 2           | c = √ ( E ÷ m )         | True               |                    0.9935   |                          0.25 |                0.0109468 |          -0.333333  |                  4.45 | -0.0233715 |                            0.8 |                    0.681302 | PASS       |
| T4_pythagorean_solve_r | x ^ 2 + y ^ 2 = r ^ 2 → r = √(x ^ 2 + y ^ 2) | x ^ 2 + y ^ 2 = r ^ 2 | r = √ ( x ^ 2 + y ^ 2 ) | True               |                    0.994333 |                          0.25 |               -0.035799  |          -0.0909091 |                  2.35 |  0.091642  |                            1   |                    0.693667 | PASS       |

## Step Metrics

| transformation         |   step_index | step_label   | tokens                  |   decode_accuracy_noise | uncertainty_state   |   uncertainty_score |   coherence_score |   compute_load_est |   loop_closure_score |   identity_preservation_from_source |
|:-----------------------|-------------:|:-------------|:------------------------|------------------------:|:--------------------|--------------------:|------------------:|-------------------:|---------------------:|------------------------------------:|
| T1_simple_solve        |            0 | source       | x + 1 = 3               |                0.9952   | Y                   |                0.6  |          0.986417 |               6    |             1        |                                 1   |
| T1_simple_solve        |            1 | isolate_x    | x = 3 - 1               |                0.9944   | Y_reduced           |                0.35 |          0.986177 |               6.9  |             1        |                                 1   |
| T1_simple_solve        |            2 | solved       | x = 2                   |                0.997333 | SOLVED              |                0.05 |          0.887057 |               5.15 |             1        |                                 0.8 |
| T2_symbolic_rearrange  |            0 | source       | a + b = c               |                0.9984   | Y                   |                0.6  |          0.99952  |               6    |             1        |                                 1   |
| T2_symbolic_rearrange  |            1 | isolate_a    | a = c - b               |                0.996    | Y_reduced           |                0.35 |          0.9988   |               6.9  |             1        |                                 1   |
| T3_energy_rearrange    |            0 | source       | E = m c ^ 2             |                0.996667 | Y                   |                0.6  |          0.939299 |               6.95 |             0.682943 |                                 1   |
| T3_energy_rearrange    |            1 | divide_by_m  | c ^ 2 = E ÷ m           |                0.998286 | Y_reduced           |                0.35 |          0.987343 |               9.55 |             1        |                                 1   |
| T3_energy_rearrange    |            2 | solve_c      | c = √ ( E ÷ m )         |                0.9935   | Y_reduced           |                0.35 |          0.950245 |              11.4  |             0.681302 |                                 0.8 |
| T4_pythagorean_solve_r |            0 | source       | x ^ 2 + y ^ 2 = r ^ 2   |                0.999636 | Y                   |                0.6  |          0.976006 |              14.75 |             0.92172  |                                 1   |
| T4_pythagorean_solve_r |            1 | swap_sides   | r ^ 2 = x ^ 2 + y ^ 2   |                0.999273 | Y_reduced           |                0.35 |          0.959139 |              15.65 |             0.809998 |                                 1   |
| T4_pythagorean_solve_r |            2 | solve_r      | r = √ ( x ^ 2 + y ^ 2 ) |                0.994333 | Y_reduced           |                0.35 |          0.940207 |              17.1  |             0.693667 |                                 1   |

## Transition Metrics

| transformation         | from_step   | to_step     |   coherence_gain |   uncertainty_reduction |   compression_gain |   compute_load_delta |        CEI |   identity_preservation |
|:-----------------------|:------------|:------------|-----------------:|------------------------:|-------------------:|---------------------:|-----------:|------------------------:|
| T1_simple_solve        | source      | isolate_x   |       -0.00024   |                    0.25 |          0         |                 0.9  |  0.277511  |                     1   |
| T1_simple_solve        | isolate_x   | solved      |       -0.09912   |                    0.3  |          0.4       |                -1.75 |  1.20176   |                     0.8 |
| T2_symbolic_rearrange  | source      | isolate_a   |       -0.00072   |                    0.25 |          0         |                 0.9  |  0.276978  |                     1   |
| T3_energy_rearrange    | source      | divide_by_m |        0.0480443 |                    0.25 |         -0.166667  |                 2.6  |  0.0505299 |                     1   |
| T3_energy_rearrange    | divide_by_m | solve_c     |       -0.0370975 |                    0    |         -0.142857  |                 1.85 | -0.0972728 |                     0.8 |
| T4_pythagorean_solve_r | source      | swap_sides  |       -0.0168674 |                    0.25 |          0         |                 0.9  |  0.259036  |                     1   |
| T4_pythagorean_solve_r | swap_sides  | solve_r     |       -0.0189316 |                    0    |         -0.0909091 |                 1.45 | -0.0757522 |                     1   |

## Interpretation

### Primary Result

All transformations remain decodable and stable under coordinate noise.

The simple equation:

```text
x + 1 = 3 → x = 3 - 1 → x = 2
```

is the strongest result. It shows a clean decrease from structured uncertainty `Y` into a solved bound state.

### Geometric Meaning

The transformation does not only rewrite a string. It changes the loop shape while preserving a recognizable identity path.

This supports the ICS-Math thesis:

```text
Equation = symbolic fragment loop
Transformation = loop deformation
Solution = uncertainty reduction / loop simplification
```

### Compute Meaning

The toy compute-load estimate shows where transformations simplify the structure and where intermediate steps temporarily add cost.

This connects to the later ICS v3 principle:

```text
Temporary complexity is acceptable if it produces later compression.
```

### Important Weakness

More complex equations do not always reduce geometric loop length or compute load. This means the current manifold is valid for encoding and tracking transformations, but not yet proven to reduce computation for complex algebra.

That must be tested later with larger equations and cached geometric imprints.

## Pass / Partial / Fail

PASS condition:

```text
all_exact_decode = true
min_decode_accuracy_noise > 0.95
target_identity_preservation > 0.75
uncertainty does not increase destructively
```

Observed decision:

```text
Experiment 3 = PASS for controlled transformations
```

## Recommended Next Step

Proceed to Experiment 4 — X/Y/Ω/Ø Ambiguity Test.

Test expressions:

```text
x / 0
0 / 0
∞ - ∞
sqrt(-1)
x + ? = 5
Ø
```

Goal:

Verify that ICS-Math can distinguish unknown, bounded unknown, impossibility, absence, and domain-extension-needed cases.
