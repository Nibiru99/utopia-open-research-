# Publication policy

## Evidence levels

| Level | Meaning |
|---|---|
| L0 | Concept or narrative only |
| L1 | Source report located; executable or row provenance unresolved |
| L2 | Machine-readable rows or metrics located; clean rerun unresolved |
| L3 | Generator, metric source, configuration, seeds, and environment registered |
| L4 | Clean deterministic rerun reproduces the registered result |
| L5 | Independent external reproduction |

A generated “validated” label is not evidence by itself.

## Claim rules

- State what was measured, on which fixtures, with which controls.
- Separate mathematical analogy from physical correspondence.
- Report failures, leakage, null results, and post-hoc changes.
- Never describe expected or simulated output as observed output.
- Do not infer consciousness, clinical performance, physics, or human behavior from a synthetic benchmark.
- Unsupported historical claims must be marked unsupported, withdrawn, or pending reconstruction.
- Human-participant or biosignal work requires a separate protocol, consent, privacy controls, and appropriate ethics review.

Release states: `source-audit` → `design-draft` → `preregistered` → `executed` → `release-candidate` → `published`.
