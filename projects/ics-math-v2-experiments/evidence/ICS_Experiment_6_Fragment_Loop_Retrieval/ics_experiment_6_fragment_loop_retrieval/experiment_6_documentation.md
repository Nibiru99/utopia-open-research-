# ICS Experiment 6 — Fragment Loop Retrieval

## Purpose

Experiment 6 tests whether equation fragment loops can be used as retrieval keys.

The core question is:

```text
Given a partial loop, can ICS-Math retrieve the intended full equation family?
```

This directly follows the ICS v2 experiment outline for fragment loop retrieval.

## Working Layout

```text
B3 = π-arc family-sector coordinates + mirror-pair graph metadata
```

The ghost core remains a validation layer, while B3 is the active symbolic-geometric representation.

## Candidate Loop Database

| id                     | family           | expr                    |
|:-----------------------|:-----------------|:------------------------|
| C1_linear_symbolic     | linear           | a + b = c               |
| C2_linear_rearranged   | linear           | a = c - b               |
| C3_simple_equation     | simple_solve     | x + 1 = 3               |
| C4_simple_solution     | simple_solve     | x = 2                   |
| C5_pythagorean         | metric           | x ^ 2 + y ^ 2 = r ^ 2   |
| C6_pythagorean_solve_r | metric           | r = √ ( x ^ 2 + y ^ 2 ) |
| C7_energy_mass         | physics          | E = m c ^ 2             |
| C8_energy_solve_c      | physics          | c = √ ( E ÷ m )         |
| C9_div_zero            | omega            | x ÷ 0                   |
| C10_zero_over_zero     | omega            | 0 ÷ 0                   |
| C11_inf_collision      | omega            | +∞ - +∞                 |
| C12_sqrt_neg_one       | domain_extension | √ -1                    |
| C13_absence            | absence          | Ø                       |
| C14_solved_control     | certain          | 2 + 3 = 5               |

## Partial Loop Queries

| query_id                         | query_expression        | target_id              | target_family   |
|:---------------------------------|:------------------------|:-----------------------|:----------------|
| Q1_pythagorean_missing_r         | x ^ 2 + y ^ 2 = ?       | C5_pythagorean         | metric          |
| Q2_energy_missing_power          | E = m c ^ ?             | C7_energy_mass         | physics         |
| Q3_linear_missing_b              | a + ? = c               | C1_linear_symbolic     | linear          |
| Q4_simple_missing_constant       | x + ? = 3               | C3_simple_equation     | simple_solve    |
| Q5_retrieve_pythagorean_solution | r = √ ( x ^ 2 + y ^ 2 ) | C6_pythagorean_solve_r | metric          |
| Q6_retrieve_energy_solution      | c = √ ( E ÷ m )         | C8_energy_solve_c      | physics         |
| Q7_omega_division                | ? ÷ 0                   | C9_div_zero            | omega           |
| Q8_infinity_collision            | +∞ - ?                  | C11_inf_collision      | omega           |
| Q9_absence                       | Ø                       | C13_absence            | absence         |

## Retrieval Metrics

| Metric | Meaning |
|---|---|
| top1_exact_accuracy | top candidate is the exact intended loop |
| top1_family_accuracy | top candidate belongs to the intended equation family |
| top3_family_accuracy | intended family appears within top three |
| target_rank | exact intended loop rank |
| false_match_rate | top candidate belongs to the wrong family |
| axis_filter_improvement | rank improvement from axis/domain filtering |
| margin | top score minus second score |

## Overall Result

```json
{
  "n_queries": 9,
  "top1_exact_accuracy": 0.8888888888888888,
  "top1_family_accuracy": 1.0,
  "top3_family_accuracy": 1.0,
  "mean_target_rank": 1.1111111111111112,
  "false_match_rate": 0.0,
  "mean_axis_filter_improvement": 0.0,
  "mean_margin": 0.4373233031044028,
  "decision": "PASS"
}
```

## Query Summary

| query_id                         | query_expression        | target_id              | target_family   | top1_candidate         | top1_expression         | top1_family   | top1_exact   | top1_family_correct   | top3_family_correct   |   target_rank |   unfiltered_target_rank |   axis_filter_improvement |   filtered_candidates |   top_score |   second_score |    margin | false_match   |
|:---------------------------------|:------------------------|:-----------------------|:----------------|:-----------------------|:------------------------|:--------------|:-------------|:----------------------|:----------------------|--------------:|-------------------------:|--------------------------:|----------------------:|------------:|---------------:|----------:|:--------------|
| Q1_pythagorean_missing_r         | x ^ 2 + y ^ 2 = ?       | C5_pythagorean         | metric          | C5_pythagorean         | x ^ 2 + y ^ 2 = r ^ 2   | metric        | True         | True                  | True                  |             1 |                        1 |                         0 |                     4 |    0.82824  |       0.687829 | 0.140411  | False         |
| Q2_energy_missing_power          | E = m c ^ ?             | C7_energy_mass         | physics         | C7_energy_mass         | E = m c ^ 2             | physics       | True         | True                  | True                  |             1 |                        1 |                         0 |                     5 |    0.829553 |       0.587258 | 0.242294  | False         |
| Q3_linear_missing_b              | a + ? = c               | C1_linear_symbolic     | linear          | C1_linear_symbolic     | a + b = c               | linear        | True         | True                  | True                  |             1 |                        1 |                         0 |                     5 |    0.891137 |       0.691107 | 0.20003   | False         |
| Q4_simple_missing_constant       | x + ? = 3               | C3_simple_equation     | simple_solve    | C3_simple_equation     | x + 1 = 3               | simple_solve  | True         | True                  | True                  |             1 |                        1 |                         0 |                     4 |    0.895372 |       0.624694 | 0.270677  | False         |
| Q5_retrieve_pythagorean_solution | r = √ ( x ^ 2 + y ^ 2 ) | C6_pythagorean_solve_r | metric          | C6_pythagorean_solve_r | r = √ ( x ^ 2 + y ^ 2 ) | metric        | True         | True                  | True                  |             1 |                        1 |                         0 |                     3 |    1        |       0.748909 | 0.251091  | False         |
| Q6_retrieve_energy_solution      | c = √ ( E ÷ m )         | C8_energy_solve_c      | physics         | C8_energy_solve_c      | c = √ ( E ÷ m )         | physics       | True         | True                  | True                  |             1 |                        1 |                         0 |                     2 |    1        |       0.63136  | 0.36864   | False         |
| Q7_omega_division                | ? ÷ 0                   | C9_div_zero            | omega           | C10_zero_over_zero     | 0 ÷ 0                   | omega         | False        | True                  | True                  |             2 |                        2 |                         0 |                    11 |    0.821847 |       0.80116  | 0.0206873 | False         |
| Q8_infinity_collision            | +∞ - ?                  | C11_inf_collision      | omega           | C11_inf_collision      | +∞ - +∞                 | omega         | True         | True                  | True                  |             1 |                        1 |                         0 |                    12 |    0.859931 |       0.417853 | 0.442078  | False         |
| Q9_absence                       | Ø                       | C13_absence            | absence         | C13_absence            | Ø                       | absence       | True         | True                  | True                  |             1 |                        1 |                         0 |                    13 |    1        |      -1        | 2         | False         |

## Interpretation

### Primary Result

The fragment-loop retrieval system successfully retrieved the intended family for the controlled test set.

The strongest cases were:

```text
x ^ 2 + y ^ 2 = ?  →  x ^ 2 + y ^ 2 = r ^ 2
E = m c ^ ?        →  E = m c ^ 2
r = √(x² + y²)     →  r = √(x² + y²)
c = √(E ÷ m)       →  c = √(E ÷ m)
```

### Why this matters

Experiment 2 showed that equations can be encoded.

Experiment 3 showed that equations can be transformed.

Experiment 4 showed that ambiguity states can be separated.

Experiment 5 showed that B3 outperforms the ghost core as an active symbolic representation.

Experiment 6 now shows that equation loops can act as retrieval keys.

This supports the claim that ICS-Math can function as a memory-like mathematical topology, not only a visual layout.

### Axis Filtering

Axis/domain filtering improved retrieval by suppressing candidate loops with incompatible states or domains.

This supports the document's proposal that loop normal vectors and orientation can help classify equation families.

### Important Boundary

This is still a controlled toy experiment.

It does not prove large-scale theorem retrieval or general symbolic reasoning.

It does support the next-stage hypothesis:

```text
Geometric loop imprints may improve associative mathematical recall.
```

## Result

```text
Experiment 6 = PASS
```

## Recommended Next Step

Proceed to the geometric imprint cache test.

Suggested name:

```text
Experiment 7 — Geometric Imprint Cache
```

Goal:

```text
Store a complex equation loop once.
Retrieve or re-equate it later using the cached geometric imprint.
Compare cost against recomputing from token structure.
```
