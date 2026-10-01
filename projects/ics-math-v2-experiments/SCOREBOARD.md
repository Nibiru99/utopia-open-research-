<!-- LOCAL STAGING 2026-10-01: drafted for Wave 1 Step 3. Do not push until owner yes in chat. -->
# Controlled recall & cache proxies (ICS-Math v2)

**Status:** local ad-sheet draft â€” not a product claim  
**Evidence deposit:** [10.5281/zenodo.22830316](https://doi.org/10.5281/zenodo.22830316)  
**Creator:** David Glowalla  
**Lane:** public benchmark / interest ad  
**Not included:** studio binary, Hybrid Existence architecture, licensed finding-lab

These are **controlled toy-simulation** results for the Symbolic Equation Manifold (B3 layout). They support architectural direction. They do **not** claim replacement of conventional databases, vector search, or deployed AI memory products.

## Scoreboard

| Experiment | What it tests | Headline | n | Decision |
|---|---|---|---:|---|
| **5** Base-10 ghost benchmark | Representation quality / retrieval stability / compute-cost proxies | B3 loop overall **0.791** vs string **0.664** vs ghost core **~0.31**; B3 retrieval_stability **0.995** | â€” | comparative table |
| **6** Fragment-loop retrieval | Recall from partial fragments | top-1 exact **0.889**; top-1 family **1.0**; false_match_rate **0** | 9 | PASS |
| **7** Geometric imprint cache | Recovery speed / cost vs uncached baseline | cache exact **1.0** vs baseline **0.556**; mean_speedup_proxy **~13.7**; mean_cost_reduction **~0.91** | 9 | PASS |
| **8** Scale + noise imprint robustness | Cache/recall under larger DB + noise | overall top-1 exact **~0.916**; family **~0.988**; speedup_proxy **~14.6**; cost_reduction **~0.93** | 320 | PASS |

### Experiment 5 â€” representation comparison (detail)

| Representation | overall_score | retrieval_stability | compute_cost (proxy) |
|---|---:|---:|---:|
| C_ICS_B3_loop | 0.791 | 0.995 | 9.64 |
| A_conventional_string | 0.664 | 0.989 | 11.21 |
| B_base10_ghost_core | ~0.312 | 0.384 | 11.33 |

### Experiment 7 â€” cache vs baseline (detail)

| Arm | exact accuracy | notes |
|---|---:|---|
| Geometric imprint cache | 1.0 | mean_actual_speedup_ms â‰ˆ 22.2 (toy timer) |
| Uncached baseline | 0.556 | mean_baseline_target_rank â‰ˆ 1.89 |

## Boundaries (print on every public face)

1. Toy simulation / controlled symbolic layout â€” not production RAG benchmarks.
2. No external AI baseline comparison in this sheet.
3. No measured storage-byte compression curve yet (PAM readiness audit flags this gap).
4. Studio / commercial finding-lab access is separate; license price **TBD**.

## Cite

Glowalla, D. (2026). *ICS-Math v2: Controlled Experimental Validation of a Symbolic Equation Manifold (Experiments 1Aâ€“8)*. Zenodo. https://doi.org/10.5281/zenodo.22830316

## Next measurement (not in this ad)

- Live p50/p95 retrieval latency on a real index size
- Bytes per retained structure vs vector baseline
- Needle-in-haystack vs long-context / RAG controls

## Related (separate sheet â€” do not mix numbers here)
Local Hive standalone instruments (BP1/BP3 sample Hive-compare) live on **SCOREBOARD_HIVE_INSTRUMENTS.md** in this folder and [[../../Asset Catalog/Hive Instruments Scoreboard|Hive Instruments Scoreboard]] in the vault. Those rows are **not** part of the Zenodo deposit above.

