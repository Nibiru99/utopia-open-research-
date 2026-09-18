**Experiment 1A — Controlled Symbol Placement + Base-10 Ghost Core** as a first numerical toy simulation.

This follows the uploaded ICS v2 plan: ICS-Math is treated as a **geometric representation layer** for symbols/equations, not a replacement for arithmetic.

## Setup

I used **54 symbols**:

```text
Numbers:      0, 1…9, -1…-9, +∞, -∞
Uncertainty:  X, Y, Ω, Ø
Operators:    +, -, ×, ÷, ^, √, log, ln
Relations:    =, ≈, <, >, ≤, ≥, →, ⇒
Structures:   (), [], {}, vector, matrix, set
Constants:    π, e, Φ, i
```

No newer symbols were used yet:

```text
No ⊙
No λ
No χ
No H
No CLO / emotional symbols
No PAM / MPIF symbols
```

The **base-10 ghost core** was included only as a validation overlay:

```text
0 = center
1–9 = reference ring
-1…-9 = mirrored reference ring
```

## Result table

|Placement model|Collision rate|Retrieval after noise|Family separation|Polarity symmetry|Digit order|
|---|--:|--:|--:|--:|--:|
|Line|14.4%|30.8%|80.2%|81.1%|100%|
|Circle|3.8%|75.7%|79.0%|47.5%|100%|
|Random sphere|0.8%|95.1%|14.8%|37.3%|11.1%|
|Fibonacci sphere|0.0%|100%|33.3%|20.6%|0.0%|
|**ICS-sector sphere**|**0.0%**|**100%**|**69.1%**|**100%**|**100%**|

## First interpretation

The **Fibonacci sphere** wins as a pure distribution system: no collisions, perfect retrieval. But it does not preserve symbolic meaning by itself. It spreads symbols well, but it does not understand families, polarity, or number order.

The **line and circle** preserve digit order because the sequence is forced, but they are weak geometrically. The line especially fails retrieval under small coordinate noise.

The **ICS-sector sphere** is the first full PASS candidate:

```text
PASS:
- no symbol collisions
- perfect noisy retrieval
- perfect positive/negative polarity mirroring
- perfect digit-order preservation
- good but not perfect family separation
```

## Most important finding

The ghost core is already useful.

It showed that the ICS layer can preserve ordinary base-10 reference structure while adding:

```text
positive/negative polarity
+∞ / -∞ boundaries
X / Y ambiguity
Ω impossibility
Ø absence
symbol-family placement
```

So the early result is:

> **ICS-sector placement adds meaningful symbolic structure without destroying the base-10 reference layer.**

## Weak spot found

Family separation is good but not perfect: **69.1%**.

That means the manifold can retrieve symbols and preserve polarity, but semantic families still need clearer shell/sector tuning.

So Experiment 1A result is:

```text
PASS, with semantic-family tuning required.
```

Recommended next step: **Experiment 1B — Semantic Family Separation Tuning**, still without adding the newer symbols.