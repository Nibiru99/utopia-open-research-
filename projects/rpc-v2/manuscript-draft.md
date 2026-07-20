# Recursive Probability Coupling: A Controlled Synthetic Benchmark of Coupled-State Convergence and Recovery

**Results manuscript draft v0.2**
**Author:** David Glowalla
**Status:** confirmatory synthetic result reproduced from a public design-freeze commit; not yet a release.

## Abstract

Recursive Probability Coupling (RPC) was previously described using coupled state vectors, cosine similarity, an entropy diagnostic, and perturbation–recovery dynamics. The prior record also contained empirical-sounding numbers for which the public package does not register observations, executable analysis, seeds, null generators, or result artifacts. This corrective version withdraws those statements and tests RPC as a deterministic synthetic benchmark across 200 paired seeds. Dynamic coupling strongly exceeded the uncoupled arm in median coherence area and recovery rate, satisfying both primary criteria. It did not outperform matched fixed coupling, and the entropy–curvature diagnostic did not exceed its circular-shift surrogate criterion. RPC therefore supports a bounded attractive-coupling mechanism in this implementation, not an adaptive advantage or entropy law. The benchmark does not test consciousness, affect, quantum phenomena, or humans.

## 1. Correction and motivation

Prior Monte Carlo, Lyapunov-bound, and entropy–curvature result statements are withdrawn as established results. Dialogue narratives are motivation rather than experimental data. The testable question is whether RPC's update and normalization rules yield behavior distinguishable from simpler controls.

## 2. Model and controls

Two normalized 32-dimensional vectors evolve through symmetric coupling and stochastic perturbations. Cosine similarity `X_t` is the coupling observable. Exact initialization, noise scaling, coupling arms, seeds, perturbation, and exclusions were frozen at commit `36be4b796e9e417b5eeca61d5873f8f6447b1dab` before execution.

Controls include uncoupled, matched-fixed, shuffled-schedule, and repulsive arms. A second dynamic arm uses the prior `dt` stochastic scaling rather than diffusion-style square-root scaling. A deterministic circular shift tests whether entropy–curvature association exceeds a relationship induced by shared trajectories.

## 3. Outcomes

Primary outcomes are paired median coherence-area advantage over uncoupled and recovery-rate advantage. Diagnostics compare dynamic with matched fixed coupling and entropy–curvature association with its surrogate. The seed range and stopping rule were fixed. Failed thresholds and negative results remain visible.

## 4. Results

All 200 declared seeds were executed. Initial cosine was centered near zero (mean `0.00149`, median `0.00755`), removing the positive-initialization bias identified in the prior design.

Dynamic coupling achieved median coherence AUC `0.89436`, compared with `-0.00751` for the uncoupled arm. The paired median advantage was `0.89793`, exceeding the frozen primary threshold `0.20`. All dynamic runs recovered after perturbation, with median recovery time `92` steps; no uncoupled run recovered. The recovery-rate advantage was `1.0`, exceeding the frozen `0.50` threshold.

The stronger adaptive interpretation failed. Matched fixed coupling produced median AUC `0.91955` and median recovery time `80` steps. The dynamic-minus-fixed paired median AUC difference was `-0.02449`, failing the frozen `+0.02` diagnostic threshold. A shuffled schedule behaved similarly to the fixed arm at this resolution.

The entropy–curvature interpretation also failed. Median observed correlation was `0.00376`, compared with `-0.00305` for circular-shift surrogates. The `0.00682` advantage was below the frozen `0.05` threshold. Changing the stochastic increment from diffusion-style scaling to the original `dt` scaling altered median AUC by only `0.00283`, passing the `0.05` sensitivity limit.

The primary contract passed; the full contract failed because both diagnostic hypotheses failed. Thresholds were not changed after observation.

## 5. Scope

The study concerns a synthetic update system. It neither uses nor authorizes EEG, HRV, EDA, participant conversations, clinical intervention, or quantum hardware. Any human study requires a separate protocol and ethics/privacy review.

## 6. Reproducibility

The dependency-free Node.js benchmark was executed from the design-freeze commit using `npm test` and `npm run rpc:run`. Four tests passed. Two executions produced byte-identical JSON and CSV files. Registered SHA-256 values accompany the artifacts.

## 7. Planned v2 change log

- identify David Glowalla as creator;
- withdraw unsupported empirical numbers;
- separate motivation from observation;
- bound the work to a controlled synthetic benchmark;
- add code, seeds, controls, results, checksums, and claim mapping;
- retain negative outcomes and protocol deviations.
