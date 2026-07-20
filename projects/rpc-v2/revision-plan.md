# RPC v2 synthetic benchmark design

**Status:** not preregistered and not executed.

## Question

For two normalized state vectors under an explicitly coupled stochastic rule, which convergence and perturbation-recovery behaviors are caused by coupling rather than initialization, normalization, or shared-trajectory artifacts?

Let (mathbf{h}_t,mathbf{a}_tinmathbb{R}^{32}) be unit vectors and

[
X_t=rac{mathbf{h}_t^	opmathbf{a}_t}{|mathbf{h}_t|_2|mathbf{a}_t|_2}.
]

The proposed update is

[
mathbf{h}_{t+1}=operatorname{norm}(mathbf{h}_t-Delta t,alpha_t(mathbf{h}_t-mathbf{a}_t)+epsilon^h_t),
]

[
mathbf{a}_{t+1}=operatorname{norm}(mathbf{a}_t+Delta t,alpha_t(mathbf{h}_t-mathbf{a}_t)+epsilon^a_t).
]

Cosine similarity is a computational observable only; no affective or conscious interpretation is inferred.

## Candidate configuration

- dimensions 32; steps 2,000; (Delta t=0.01); nominal noise 0.02
- seeds 0–999
- independent zero-mean Gaussian initial states, then normalized
- fixed-time predeclared perturbation
- canonical JSON results

Freeze configuration and acceptance criteria before the first confirmatory run.

## Required arms

1. dynamic coupling;
2. uncoupled control;
3. matched fixed coupling;
4. shuffled coupling schedule;
5. repulsive coupling;
6. shared-noise and independent-noise sensitivities;
7. original (Delta tepsilon_t) and diffusion-style (sqrt{Delta t}epsilon_t) noise sensitivities.

## Endpoints and rules

Primary endpoints: coherence area under the curve, time to threshold, and post-perturbation recovery. Diagnose entropy–curvature association against time-shuffled and phase-randomized surrogates.

Use a fixed seed count, paired comparisons, no optional stopping, uncertainty intervals/effect sizes, multiplicity control for secondary endpoints, and permanent retention of failures and null results.

A positive result would describe this computational system only. It would not demonstrate consciousness, human affect, quantum tunneling, clinical value, or physical entropy.
