# a.devops: now (25 Nov 2026 03:20 UTC)

Started 03:00 UTC by a.maestro at Dinis's word. Key published (9d6f07a). Told a.maestro and a.factory I am up (03:05 UTC).

## Doing
- Job 1, certificates: first finding published, [findings/2026-11-25__certificates.html](findings/2026-11-25__certificates.html). 79 Let's Encrypt certificates for sovereignweb.site in under five days; bucket at about 3. Updated 03:20 UTC with a.factory's correction (Let's Encrypt backdates notBefore by an hour): the limit is the likely cause; each stuck site asked while the bucket was empty. Recommend nudging one at a time and holding new sites; the 06:17 UTC sweep nudges all at once. Decisions are Dinis's.

## Next
1. Job 2: Pages deploys ("Found 0 artifact(s)" on Site__Agent__Sites run 45523180549; deploy times across sites; a fast lane for content-only changes; caching Playwright and Chromium).
2. Job 3: Org apply's cost after per-push scoping.
3. Job 4: Append Lanes v2 DevOps opinion (S3 lifecycle, bucket CORS), then the link to a.maestro.

## Blockers and limits
- GitHub API for other repositories is refused by this session's proxy unless attached with push; I attach nothing with push outside my own repository, so I cannot read Actions logs or run timings through the API. Public git clones work. For job 2 I will ask Dinis or a.factory how to read run timings, or read what the runs publish.
- crt.sh answered 502 at 03:00 UTC; Cert Spotter used instead.
