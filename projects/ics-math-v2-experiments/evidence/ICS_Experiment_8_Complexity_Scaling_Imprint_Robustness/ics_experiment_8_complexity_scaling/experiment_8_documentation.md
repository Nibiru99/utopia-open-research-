# ICS Experiment 8 — Complexity Scaling and Imprint Robustness

## Purpose

Experiment 8 stress-tests the geometric imprint cache after the strong result in Experiment 7.

The test increases:

```text
candidate database size
partial-loop noise
structurally similar distractors
repeated variables/operators
false-match pressure
```

The working layout remains:

```text
B3 = π-arc family-sector coordinates + mirror-pair graph metadata
```

## Experimental Setup

Candidate database sizes:

```text
[25, 50, 100]
```

Noise levels:

```text
[0.0, 0.1, 0.25, 0.4]
```

Noise means that variables/numbers may be replaced by `?`, and some non-critical tokens may be dropped.

## Overall Result

```json
{
  "n_conditions": 12,
  "n_queries": 320,
  "max_db_size": 100,
  "noise_levels": [
    0.0,
    0.1,
    0.25,
    0.4
  ],
  "overall_top1_exact_accuracy": 0.915625,
  "overall_top1_family_accuracy": 0.9875,
  "overall_top3_exact_accuracy": 0.96875,
  "overall_top3_family_accuracy": 0.996875,
  "overall_false_match_rate": 0.0125,
  "overall_mean_target_rank": 1.259375,
  "overall_mean_cost_reduction": 0.9293489226280652,
  "overall_mean_speedup_proxy": 14.615478981084104,
  "decision": "PASS"
}
```

## Condition Summary

|   db_size |   noise_level |   n_queries |   top1_exact_accuracy |   top1_family_accuracy |   top3_exact_accuracy |   top3_family_accuracy |   mean_target_rank |   median_target_rank |   false_match_rate |   mean_margin |   mean_cost_reduction |   mean_speedup_proxy |   mean_actual_cache_ms |
|----------:|--------------:|------------:|----------------------:|-----------------------:|----------------------:|-----------------------:|-------------------:|---------------------:|-------------------:|--------------:|----------------------:|---------------------:|-----------------------:|
|        25 |          0    |          24 |              1        |               1        |              1        |               1        |            1       |                    1 |          0         |     0.229816  |              0.912948 |              11.4874 |                3.01692 |
|        25 |          0.1  |          24 |              1        |               1        |              1        |               1        |            1       |                    1 |          0         |     0.220507  |              0.912947 |              11.4872 |                3.06618 |
|        25 |          0.25 |          24 |              0.958333 |               1        |              0.958333 |               1        |            1.20833 |                    1 |          0         |     0.137019  |              0.912942 |              11.4866 |                2.98242 |
|        25 |          0.4  |          24 |              0.875    |               0.916667 |              1        |               1        |            1.16667 |                    1 |          0.0833333 |     0.136805  |              0.912931 |              11.4851 |                2.78452 |
|        50 |          0    |          28 |              1        |               1        |              1        |               1        |            1       |                    1 |          0         |     0.192203  |              0.93157  |              14.687  |                5.59218 |
|        50 |          0.1  |          28 |              1        |               1        |              1        |               1        |            1       |                    1 |          0         |     0.156239  |              0.931896 |              14.7575 |                5.74323 |
|        50 |          0.25 |          28 |              0.964286 |               1        |              1        |               1        |            1.03571 |                    1 |          0         |     0.108015  |              0.931632 |              14.7049 |                5.79233 |
|        50 |          0.4  |          28 |              0.75     |               0.964286 |              0.964286 |               1        |            1.46429 |                    1 |          0.0357143 |     0.0716514 |              0.931532 |              14.6755 |                5.42612 |
|       100 |          0    |          28 |              1        |               1        |              1        |               1        |            1       |                    1 |          0         |     0.130123  |              0.939669 |              16.7588 |                9.99921 |
|       100 |          0.1  |          28 |              1        |               1        |              1        |               1        |            1       |                    1 |          0         |     0.0966126 |              0.94357  |              17.9959 |               11.773   |
|       100 |          0.25 |          28 |              0.785714 |               1        |              0.928571 |               1        |            1.35714 |                    1 |          0         |     0.0722172 |              0.940638 |              17.048  |                9.58316 |
|       100 |          0.4  |          28 |              0.678571 |               0.964286 |              0.785714 |               0.964286 |            2.78571 |                    1 |          0.0357143 |     0.054458  |              0.940539 |              17.024  |               10.7085  |

## Interpretation

### Primary Result

The geometric imprint cache remained robust under controlled scaling.

The most important distinction:

```text
Exact retrieval becomes harder as noise and distractors increase.
Family retrieval remains more stable.
```

This is expected and useful.

It means the manifold can still identify the correct mathematical family even when exact identity becomes underdetermined.

### Why this matters

Experiment 7 showed that cached loop imprints can reduce repeated structural recomputation.

Experiment 8 now tests whether that still holds under pressure.

The result supports the next hypothesis:

```text
Geometric imprints can act as reusable mathematical memory signatures.
```

### Scaling Result

The cache retained strong family-level recovery while maintaining high proxy cost reduction.

This supports the use of ICS-Math for:

```text
associative equation retrieval
partial equation completion
mathematical memory search
transformation candidate lookup
PAM-style structural reasoning memory
```

### Failure / Weakness

Exact top-1 retrieval is more fragile than family retrieval.

This is not a failure of the manifold. It means that when many structurally similar loops exist, exact identity requires either:

```text
more context
stronger token preservation
domain tags
transformation history
or semantic metadata
```

This points naturally toward the v3.6 layer.

## Pass / Partial / Fail

PASS condition:

```text
overall_top1_family_accuracy >= 0.82
overall_false_match_rate <= 0.18
overall_mean_cost_reduction >= 0.70
```

Observed decision:

```text
Experiment 8 = PASS
```

## Recommended Next Step

The next step should be a consolidation document:

```text
ICS-Math v2 Experimental Results Report
```

Then move into v3.6 experiments:

```text
domain tags
transformation history
semantic metadata
multi-shell imprint memory
PAM integration
larger symbolic grammar
```
