# WWS import readiness

Checked 12 October 2026 against the identical `.cursor/rules/wws-github-import.mdc` contracts in `zackderlah/alisongreenwayart-recreation-wws` and `zackderlah/dolleyconcreting-recreation-wws`.

The earlier pipeline-format build needed adaptation. The site now uses one canonical `src/cms/content.json`, keyed by original route under `pageContent`; all seven URLs have dedicated Astro page files. Shared fields live on the home entry. `pages.json` and the catch-all route were removed. Page objects are passed to the rendering template; lists use declarative `.map()` and rich text renders escaped Astro expressions rather than HTML injection. Local images and fonts are present. Visible regions use sections; grids and the fixed header were replaced with import-compatible flex and document flow.

Automated gates: JSON Schema validation, route-to-file coverage, local asset existence, absence of prohibited files and template/layout mechanisms, Astro type checks, static build and export integrity. All seven routes build to non-empty static HTML.

**Ready for GitHub import under that file contract.** No import has been executed inside a running WWS instance, so actual editor ingestion is not represented as tested.

Before production, connect the WWS form endpoint and confirm the source email spelling (`melissa_plant@bipond.com`). Configure analytics if required. Vimeo remains an external integration. Pingfusi reviewer approval remains unverified following the earlier filing timeout; structural import readiness does not certify a pixel-perfect result.
