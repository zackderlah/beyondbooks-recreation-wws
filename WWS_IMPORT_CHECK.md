# WWS ingestion status — layout review required

Checked 12 October 2026 against the identical `.cursor/rules/wws-github-import.mdc` contracts in `zackderlah/alisongreenwayart-recreation-wws` and `zackderlah/dolleyconcreting-recreation-wws`.

The earlier pipeline-format build needed adaptation. The site now uses one canonical `src/cms/content.json`, keyed by original route under `pageContent`; all seven URLs have dedicated Astro page files. Shared fields live on the home entry. `pages.json` and the catch-all route were removed. Page objects are passed to the rendering template; lists use declarative `.map()` and rich text renders escaped Astro expressions rather than HTML injection. Local images and fonts are present. Visible regions use sections; grids and the fixed header were replaced with import-compatible flex and document flow.

Automated gates: JSON Schema validation, route-to-file coverage, local asset existence, absence of prohibited files and template/layout mechanisms, Astro type checks, static build and export integrity. All seven routes build to non-empty static HTML.

**Not accepted as import-ready.** The original structural checks did not exercise WWS ingestion and missed a real conversion failure. The shared importer fix is on `working-websites/ww-studio` branch `codex/github-import-fidelity`; it requires review and deployment before reimport.

The corrected converter resolves all seven pages, all audited CMS copy, five top-level navigation entries and three service children with no unresolved template expressions or missing image sources. Its native WWS renderer has been captured across 35 page/viewport combinations (1280, 768, 390, 1440 and 1024). Static smoke checks found no broken visible images, raw expressions or horizontal overflow. No live client record or database was changed.

The result is still `needs-review`, not pixel-perfect approval. Open findings include the original 1200px layout versus WWS's 1024px content column, custom font registration, transforms/clipping/interaction selectors and real menu/form/embed behavior. Static preview actions are disabled. Reimport/refresh only after the reviewed converter is deployed, then compare the native result on a disposable WWS site.

Required future gate (from the recreation pipeline):

```sh
npm run check:ingestion -- --wws-dir=/path/to/ww-studio --website-dir=../beyondbooks-recreation-wws --config=sites/beyondbooks.json
```

Exit 1 blocks conversion; exit 2 requires layout review. `--allow-review=true` only creates review artifacts and never establishes approval. The evidence records source hash/commit and importer commit; rerun after either changes. Source build/CMS validation and the CI source-check workflow do not certify ingestion.

Before production, connect the WWS form endpoint and confirm the source email spelling (`melissa_plant@bipond.com`). Configure analytics if required. Vimeo remains an external integration. Pingfusi reviewer approval remains unverified following the earlier filing timeout; structural import readiness does not certify a pixel-perfect result.
