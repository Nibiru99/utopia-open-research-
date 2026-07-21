# Research and Git workflow

## Coordination

1. Use one branch per bounded task: `agent/<project>-<purpose>`.
2. Announce the branch and files before editing shared material.
3. One active writer owns a file at a time.
4. Fetch before starting and immediately before publishing a commit.
5. Use a draft pull request for scientific, licensing, or publication work.
6. Do not merge, tag, release, or publish a Zenodo draft until the exact package is reviewed.

Simultaneous work is safe on separate branches and files. The main conflict risk is two writers changing the same file on the same branch without fetching.

## Evidence freeze

Before release, record the exact commit, checksums, runtime, dependencies, seeds, rerun commands, claim–evidence mapping, negative results, license map, creator metadata, access level, and any ethics/privacy gate.

## Publication flow

private evidence ledger → bounded public branch → draft PR and clean rerun → reviewed merge and tag → unpublished Zenodo draft → final review → explicit publication approval
