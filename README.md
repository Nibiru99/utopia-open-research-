# UTOPIA Open Research

Public release workspace for research software, reproducible benchmarks, and
manuscripts by **David Glowalla**.

This repository is the publication-facing layer of the UTOPIA/PAM/PAC research
archive, not a mirror of the private Obsidian vault. Source notes move here only
after authorship, evidence status, sensitive content, links, and publication
intent have been reviewed.

## Repository Contract

- Preserve the distinction between measured output and interpretation.
- Attach one shared evidence status to every public research item.
- Link executable claims to a reproducible repository or archived artifact.
- Keep private notes, raw trays, and workstation paths outside this repository.
- Record publication decisions in `manifests/publication_queue.json` and
  `publication-register.json`.
- Treat branches and draft pull requests as provisional; tags and archived
  deposits identify releases.

## Current Packages

| Package | State | Purpose |
|---|---|---|
| [RPC v2](projects/rpc-v2/README.md) | executed results draft | Correct unsupported empirical language and report a controlled 200-seed synthetic benchmark |
| [ICS/GEO Tools](https://github.com/Nibiru99/ics-geo-tools-) | separate software repository | Executable ICS v3 Experiment 4/4B metric replay and stress benchmark |

## Layout

```text
docs/          public research maps and status vocabulary
manifests/     publication review and provenance records
projects/      bounded publication packages
templates/     shared evidence and release controls
tools/         repository validation utilities
```

## Validate

Requires Node.js 20 or newer for executable project packages.

```bash
npm test
python tools/validate_repository.py
```

## Creator

David Glowalla. GitHub account: [Nibiru99](https://github.com/Nibiru99). ORCID
and affiliation remain unset until confirmed.

## Licensing

Code and executable configuration are Apache-2.0. Manuscripts, documentation,
fixtures, and stored research results are CC BY 4.0 unless a file states
otherwise. See [LICENSES.md](LICENSES.md).
