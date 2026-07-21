# Evidence Status Glossary

Every public research item uses exactly one primary status.

| Status | Meaning |
| --- | --- |
| `validated` | Passed its stated acceptance gate across the documented scope and controls. |
| `supported` | Repeated evidence favors the result, with stated limits still open. |
| `experimental` | Implemented and measured, but replication or stronger controls remain. |
| `unconfirmed` | A result or interpretation exists but does not yet clear its gate. |
| `speculative` | A hypothesis or design direction without sufficient direct evidence. |
| `appendix` | Preserved for context and excluded from active implementation requirements. |
| `deprecated` | Superseded or rejected for active use, retained for provenance. |

Status applies to a specific claim and scope. It should not be inherited by an
entire architecture simply because one component passed or failed a test.
