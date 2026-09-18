# ICS Experiment 1B — π-Arc Family Separation Tuning

## Purpose

Experiment 1B tests whether adding a π-arc reference layer improves semantic family separation inside the ICS-Math symbolic manifold while preserving the base-10 ghost core as a validation overlay.

This follows the ICS v2 principle:

> ICS-Math does not replace arithmetic. It provides a geometric representation layer for mathematical symbols and equations.

## Variants

| Variant | Description |
|---|---|
| B0 | Previous ICS-sector sphere baseline |
| B1 | ICS-sector sphere + π-arc family sectors |
| B2 | ICS-sector sphere + π-arc family sectors + mirror edges for +n/-n |

## Symbol Set

Total symbols: 54

Families:

- **numeric**: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -2, -3, -4, -5, -6, -7, -8, -9, +∞, -∞
- **uncertainty**: X, Y, Ω, Ø
- **operator**: +, -, ×, ÷, ^, √, log, ln, Σ, ∫, d/dx
- **relation**: =, ≈, <, >, ≤, ≥, →, ⇒
- **structure**: (), [], {}, vector, matrix, set
- **constant**: π, e, Φ, i

No newer observer, emotional, CLO, PAM, or MPIF symbols were included.

## π-Arc Layer

Each point receives a π-arc coordinate:

```text
θ ∈ [0, 2π]
u = θ / 2π
s = r · θ
πCoord(symbol) = (r, θ, u, s)
```

This means every symbol can be referenced back to the originating circle at any recursive shell depth.

## Metrics

| Metric | Meaning |
|---|---|
| collision_rate | fraction of symbol pairs that are too close |
| retrieval_after_noise | nearest-neighbor recovery after coordinate noise |
| family_separation_knn | average nearest-neighbor family purity |
| polarity_symmetry | antipodal mirroring quality of +n / -n |
| digit_order_score | preservation of 1→9 and -1→-9 order |
| pi_checksum_error_noisy | angular reconstruction error after noise |
| ghost_core_distortion | distortion against base-10 ghost ring |
| mirror_edge_coverage | whether +n/-n mirror edges are explicitly present |

## Results

| variant                     |   collision_rate |   retrieval_after_noise |   family_separation_knn |   polarity_symmetry |   digit_order_score |   pi_checksum_error_clean |   pi_checksum_error_noisy |   ghost_core_distortion |   mirror_edge_coverage |
|:----------------------------|-----------------:|------------------------:|------------------------:|--------------------:|--------------------:|--------------------------:|--------------------------:|------------------------:|-----------------------:|
| B0_previous_ICS_sector      |        0.0055905 |                0.996519 |                0.240741 |            0.950502 |                   1 |               3.92661e-18 |                0.00316272 |               0.0392938 |                      0 |
| B1_pi_arc_sectors           |        0.022362  |                0.988    |                0.833333 |            0.276978 |                   1 |               5.48089e-18 |                0.00340124 |               0.103696  |                      0 |
| B2_pi_arc_plus_mirror_edges |        0.0237596 |                0.986889 |                0.709877 |            1        |                   1 |               6.78976e-18 |                0.00294092 |               0.103696  |                      1 |

## Interpretation

### B0

B0 preserves the earlier ICS-sector idea and keeps retrieval high, but semantic family separation is weaker than desired.

### B1

B1 improves family separation by anchoring each family to a π-derived angular sector. This supports the idea that π can act as a geometric checksum and origin reference layer.

### B2

B2 keeps the π-arc family sectors and adds mirror edges between positive and negative digit pairs. This strongly improves polarity symmetry while keeping retrieval stable.

## Preliminary Conclusion

Experiment 1B supports introducing the π-arc layer early as a geometric validation layer, not as a new semantic symbol layer.

The strongest coordinate candidate is B1.

The strongest polarity mechanism is B2.

Recommended synthesis for Experiment 2:

```text
Use B1 π-arc coordinate placement
+ add B2-style mirror edges as graph metadata
```

This preserves family separation while gaining positive/negative connectivity.

## Pass / Partial / Fail

PASS condition:

```text
family_separation_knn > 0.80
retrieval_after_noise > 0.95
collision_rate < 0.02
polarity_symmetry high or explicitly modeled
```

Observed decision:

```text
B0: PARTIAL
B1: PASS for semantic family separation
B2: PASS for polarity/mirror symmetry, but with a family-separation tradeoff
```

Important nuance:

B2 proves that mirror-pair geometry works, but forcing negative digits into antipodal coordinates reduces family-neighborhood purity from B1. The best next design is likely:

```text
B1 coordinate placement
+ B2 mirror edges as graph metadata
```

rather than forcing every mirror value to move geometrically.

## Recommended Next Step

Proceed to Experiment 2 — Equation Encoding.

Suggested equations:

```text
a + b = c
x + 1 = 3
x² + y² = r²
E = mc²
```

Experiment 2 should test whether equations can be encoded as fragment loops and decoded back into standard notation.
