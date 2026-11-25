# a.devops: restart

A new session of a.devops takes over like this:

1. Read CLAUDE.md and START.md in Site__Agent__DevOps. Run `bash tools/setup-signing.sh a.devops@SovereignWebsite.dinis <your-session-url>`. A new session has a new key: publish it as its own commit (only `site/keys/a.devops.json`) or ask a.factory to add it to IaC team/keys.json.
2. Read this area: `agent.json` (jobs, waiting_on), `now.md`, `role.md`, then the findings.
3. Clone what you measure read-only: `git clone --filter=blob:none -b dev https://github.com/SovereignWebsite/SovereignWebsite__IaC.git` (public; the session proxy serves anonymous reads).
4. Certificates: `https://api.certspotter.com/v1/issuances?domain=sovereignweb.site&include_subdomains=true&expand=dns_names&expand=issuer`, paginate with `after=<last id>`; crt.sh is often 502. To see a site's real certificate through this container's proxy use `curl -k -w '%{certs}' -o /dev/null https://<host>` (openssl shows the proxy's own certificate).
5. Tell a.maestro (session_018yvwtLiem1AqdA1YkKse4h) you have taken over, then continue the first open job in agent.json.
