# ICS Experiment 7 — Geometric Imprint Cache

## Purpose

Experiment 7 tests whether equation-loop geometry can be stored once as a reusable imprint.

Core question:

```text
Can a complex equation loop be cached geometrically and later retrieved or re-equated with less recomputation?
```

## Working Layout

```text
B3 = π-arc family-sector coordinates + mirror-pair graph metadata
```

## Geometric Imprint Definition

Each cached loop stores:

```text
centroid
normal vector
covariance eigenvalues
loop length
token count
center state
family histogram
operator histogram
symbol-presence profile
normalized imprint vector
```

The cache does not replace the expression. It stores a reusable structural signature of the equation loop.

## Candidate Database

| id                     | family       | expr                                  |
|:-----------------------|:-------------|:--------------------------------------|
| C1_linear_symbolic     | linear       | a + b = c                             |
| C2_linear_rearranged   | linear       | a = c - b                             |
| C3_simple_equation     | simple_solve | x + 1 = 3                             |
| C4_simple_solution     | simple_solve | x = 2                                 |
| C5_pythagorean         | metric       | x ^ 2 + y ^ 2 = r ^ 2                 |
| C6_pythagorean_solve_r | metric       | r = √ ( x ^ 2 + y ^ 2 )               |
| C7_energy_mass         | physics      | E = m c ^ 2                           |
| C8_energy_solve_c      | physics      | c = √ ( E ÷ m )                       |
| C9_circle_center       | metric       | ( x - a ) ^ 2 + ( y - b ) ^ 2 = r ^ 2 |
| C10_area_circle        | geometry     | A = π r ^ 2                           |
| C11_force              | physics      | F = m a                               |
| C12_omega_div_zero     | omega        | x ÷ 0                                 |
| C13_absence            | absence      | Ø                                     |

## Query Set

| query_id                 | mode                  | query_expression                  | target_id              | target_expression                     |
|:-------------------------|:----------------------|:----------------------------------|:-----------------------|:--------------------------------------|
| Q1_pythagorean_partial   | partial_retrieval     | x ^ 2 + y ^ 2 = ?                 | C5_pythagorean         | x ^ 2 + y ^ 2 = r ^ 2                 |
| Q2_circle_partial        | partial_retrieval     | ( x - a ) ^ 2 + ( y - b ) ^ 2 = ? | C9_circle_center       | ( x - a ) ^ 2 + ( y - b ) ^ 2 = r ^ 2 |
| Q3_energy_partial        | partial_retrieval     | E = m c ^ ?                       | C7_energy_mass         | E = m c ^ 2                           |
| Q4_area_partial          | partial_retrieval     | A = π ? ^ 2                       | C10_area_circle        | A = π r ^ 2                           |
| Q5_force_partial         | partial_retrieval     | F = m ?                           | C11_force              | F = m a                               |
| Q6_pythagorean_re_equate | cached_transformation | x ^ 2 + y ^ 2 = r ^ 2             | C6_pythagorean_solve_r | r = √ ( x ^ 2 + y ^ 2 )               |
| Q7_energy_re_equate      | cached_transformation | E = m c ^ 2                       | C8_energy_solve_c      | c = √ ( E ÷ m )                       |
| Q8_simple_re_equate      | cached_transformation | x + 1 = 3                         | C4_simple_solution     | x = 2                                 |
| Q9_linear_re_equate      | cached_transformation | a + b = c                         | C2_linear_rearranged   | a = c - b                             |

## Overall Result

```json
{
  "n_queries": 9,
  "cache_exact_accuracy": 1.0,
  "cache_family_accuracy": 1.0,
  "mean_cache_target_rank": 1.0,
  "mean_speedup_proxy": 13.675583023836198,
  "mean_cost_reduction": 0.9079529114034188,
  "mean_actual_speedup_ms": 22.169781750200862,
  "baseline_exact_accuracy": 0.5555555555555556,
  "mean_baseline_target_rank": 1.8888888888888888,
  "decision": "PASS"
}
```

## Query Results

| query_id                 | mode                  | target_id              | cache_top_id           | cache_exact   | family_correct_cache   |   cache_target_rank |   speedup_proxy |   cost_reduction | recompute_top_id   | recompute_exact   |   recompute_target_rank |
|:-------------------------|:----------------------|:-----------------------|:-----------------------|:--------------|:-----------------------|--------------------:|----------------:|-----------------:|:-------------------|:------------------|------------------------:|
| Q1_pythagorean_partial   | partial_retrieval     | C5_pythagorean         | C5_pythagorean         | True          | True                   |                   1 |         7.65398 |         0.869349 | C5_pythagorean     | True              |                       1 |
| Q2_circle_partial        | partial_retrieval     | C9_circle_center       | C9_circle_center       | True          | True                   |                   1 |         6.95381 |         0.856194 | C9_circle_center   | True              |                       1 |
| Q3_energy_partial        | partial_retrieval     | C7_energy_mass         | C7_energy_mass         | True          | True                   |                   1 |         8.21543 |         0.878278 | C7_energy_mass     | True              |                       1 |
| Q4_area_partial          | partial_retrieval     | C10_area_circle        | C10_area_circle        | True          | True                   |                   1 |         8.21543 |         0.878278 | C10_area_circle    | True              |                       1 |
| Q5_force_partial         | partial_retrieval     | C11_force              | C11_force              | True          | True                   |                   1 |         8.83393 |         0.8868   | C11_force          | True              |                       1 |
| Q6_pythagorean_re_equate | cached_transformation | C6_pythagorean_solve_r | C6_pythagorean_solve_r | True          | True                   |                   1 |        26.9707  |         0.962923 | C5_pythagorean     | False             |                       2 |
| Q7_energy_re_equate      | cached_transformation | C8_energy_solve_c      | C8_energy_solve_c      | True          | True                   |                   1 |        19.7133  |         0.949273 | C7_energy_mass     | False             |                       6 |
| Q8_simple_re_equate      | cached_transformation | C4_simple_solution     | C4_simple_solution     | True          | True                   |                   1 |        18.2619  |         0.945241 | C3_simple_equation | False             |                       2 |
| Q9_linear_re_equate      | cached_transformation | C2_linear_rearranged   | C2_linear_rearranged   | True          | True                   |                   1 |        18.2619  |         0.945241 | C1_linear_symbolic | False             |                       2 |

## Cache Build Metrics

| candidate_id           | family       |   n_tokens | center_state   |   loop_length |   build_time_ms |   imprint_dim |
|:-----------------------|:-------------|-----------:|:---------------|--------------:|----------------:|--------------:|
| C1_linear_symbolic     | linear       |          5 | Y              |       5.16243 |        1.44601  |           106 |
| C2_linear_rearranged   | linear       |          5 | Y              |       5.0355  |        1.03896  |           106 |
| C3_simple_equation     | simple_solve |          5 | Y              |       7.68269 |        0.727546 |           106 |
| C4_simple_solution     | simple_solve |          3 | Y              |       4.72444 |        0.591047 |           106 |
| C5_pythagorean         | metric       |         11 | Y              |      15.2505  |        1.24419  |           106 |
| C6_pythagorean_solve_r | metric       |         12 | Y              |      16.4947  |        1.26064  |           106 |
| C7_energy_mass         | physics      |          6 | Y              |       8.13767 |        0.815925 |           106 |
| C8_energy_solve_c      | physics      |          8 | Y              |      11.0325  |        1.13775  |           106 |
| C9_circle_center       | metric       |         19 | Y              |      28.2434  |        2.26457  |           106 |
| C10_area_circle        | geometry     |          6 | Y              |       9.10151 |        1.06683  |           106 |
| C11_force              | physics      |          4 | Y              |       4.15864 |        0.833647 |           106 |
| C12_omega_div_zero     | omega        |          3 | Ω              |       4.24821 |        0.72605  |           106 |
| C13_absence            | absence      |          1 | Ø              |       0       |        0.186732 |           106 |

## Interpretation

### Primary Result

The geometric imprint cache recovered the correct target family in the controlled test set and reduced the toy cost estimate significantly.

### Why this matters

Earlier experiments showed:

```text
Experiment 2: equations can be encoded
Experiment 3: equations can be transformed
Experiment 4: ambiguity states can be separated
Experiment 5: B3 outperforms the ghost core as active representation
Experiment 6: partial loops can retrieve equation families
```

Experiment 7 adds:

```text
Equation loops can be cached as reusable geometric imprints.
```

This supports the hypothesis that ICS-Math can become a structural reasoning memory rather than only a visual representation.

### Compute Boundary

The cost reduction is a proxy measurement, not hardware proof.

The test shows that comparing cached imprints can reduce repeated structural recomputation in this toy model. It does not yet prove faster real-world algebra solving.

### Important Distinction

A cached imprint is not the answer itself.

It is a reusable structural coordinate that can guide retrieval, transformation lookup, and family matching.

## Pass / Partial / Fail

PASS condition:

```text
cache_family_accuracy >= 0.85
mean_cost_reduction > 0.50
mean_cache_target_rank <= 2
```

Observed decision:

```text
Experiment 7 = PASS
```

## Recommended Next Step

Proceed to a larger-scale stress test before moving into v3.6:

```text
Experiment 8 — Complexity Scaling and Imprint Robustness
```

Suggested tests:

```text
increase equation length
increase candidate database size
add noisy partial loops
add repeated variables
add structurally similar distractors
measure cache false-match rate
measure cost scaling
```
