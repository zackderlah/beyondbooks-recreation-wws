# Beyond Books — recreation report

Prepared 12 October 2026. Source: https://www.beyondbooks.net.au/.

## Delivered

Seven routes: /, /contact, /why-choose-beyond-books, /bookkeeping, /software-solutions, /streamlining-systems, /about. Clean Astro + TypeScript + Tailwind implementation in the separate beyondbooks-recreation-wws repository. Shared header, footer, media, rich-text and form components; preserved navigation, SEO, source copy and media. No WebWave runtime or generated positioning architecture is shipped.

## WWS content contract

The user confirmed the supplied pipeline’s structure as the import contract. The initial build used site.json/pages.json; the corrected GitHub-import build uses src/cms/content.json → pageContent, with shared fields under the home entry and original routes mapped to authored page templates and typed editable content. schema.json is validated with Ajv; types.ts defines the component content types. Content has no arbitrary CSS, raw HTML or x/y layout fields. Original images, source SVG assets and fonts are local in public/assets, with an original-to-local asset map. The export includes a manifest, content/assets and the complete Astro project. Actual import against a separate WWS service API has not been performed.

## Checks

- Production build: all seven static routes generated successfully.
- Astro check: 0 errors, warnings or hints.
- JSON Schema and import validation: passed.
- Playwright behavior: all routes return 200, exactly one H1 per route, all images load, no page errors, desktop hover dropdown and mobile navigation work.
- Contact success and failure handling checked using intercepted local requests; no enquiry was sent.
- Three full responsive QA passes; targeted final tablet-home dimension confirmation.
- All 21 source/generated screenshot dimensions match. Mean pixel difference: 2.50%. This is a diagnostic, not a claim of perfect visual similarity or an acceptance threshold.

| Route / viewport                    | Pixel difference | Dimensions  |
| ----------------------------------- | ---------------: | ----------- |
| home/desktop.png                    |            1.43% | 1440 × 1605 |
| home/mobile.png                     |            1.12% | 390 × 1939  |
| home/tablet.png                     |            1.46% | 1024 × 1583 |
| about/desktop.png                   |            1.76% | 1440 × 1237 |
| about/mobile.png                    |            3.87% | 390 × 2252  |
| about/tablet.png                    |            0.77% | 1024 × 1706 |
| software-solutions/desktop.png      |            2.13% | 1440 × 2450 |
| software-solutions/mobile.png       |            5.56% | 390 × 3341  |
| software-solutions/tablet.png       |            1.72% | 1024 × 3284 |
| streamlining-systems/desktop.png    |            1.79% | 1440 × 1392 |
| streamlining-systems/mobile.png     |            6.33% | 390 × 2118  |
| streamlining-systems/tablet.png     |            3.55% | 1024 × 1444 |
| why-choose-beyond-books/desktop.png |            1.82% | 1440 × 1381 |
| why-choose-beyond-books/mobile.png  |            4.10% | 390 × 2884  |
| why-choose-beyond-books/tablet.png  |            1.25% | 1024 × 1634 |
| bookkeeping/desktop.png             |            1.59% | 1440 × 1590 |
| bookkeeping/mobile.png              |            3.46% | 390 × 2504  |
| bookkeeping/tablet.png              |            2.67% | 1024 × 1734 |
| contact/desktop.png                 |            1.57% | 1440 × 2127 |
| contact/mobile.png                  |            2.84% | 390 × 2591  |
| contact/tablet.png                  |            1.75% | 1024 × 1920 |

## Integrations and required import configuration

- The four original Vimeo players remain functional external embeds. Player chrome, thumbnail resolution and rendering can vary with third-party state.
- Telephone and social links are preserved. The original Google Hangout-labelled Call button links to the phone number.
- The original WebWave contact receiver is not portable. Configure content.json → pageContent → /contact → form.endpoint with a WWS-owned receiver accepting POST JSON (name, email, phone, interest, message). Until then, submit opens an email draft and explains that the user must send it. It does not claim delivery.
- The source exposes melissa_plant@bipond.com. Confirm this spelling before production; no corrected address was invented.
- Configure destination-owned analytics on import. Original analytics and WebWave scripts were not copied.
- Historical source footer credit text is preserved for visual fidelity. The runtime is Astro.

## Pingfusi review

Pingfusi 0.18.0 preflight passed. The site was registered as adopted target beyondbooks at 1440px so WWS architecture remains authored. A draft was uploaded and byte-verified: https://pingfusi.com/d/ZbLyKfXzFRJ0 (temporary, expires 14 October 2026 at 14:31 Melbourne time). The subsequent review-filing command returned: “review-qa: The operation was aborted due to timeout”. No review ID or reviewer verdict was returned or recorded. Service discovery and account authentication remain reachable. The draft predates the final spacing corrections. Do not represent it as the final local build.

The pixel-perfect-clone skill requires stopping when the service blocks review filing, rather than inventing independent approval. Review is therefore unverified. Before filing another round, check the Pingfusi account for an existing job from the timed-out request to avoid a duplicate. Publish the current dist before retrying a review.

## Remaining differences

Minor source-vs-build spacing, list/text wrapping and media-rendering differences remain, most visible in mobile service pages. Source screenshots and diff images remain in the pipeline’s recreation folders. The source uses fixed canvas heights at some breakpoints; this rebuild uses normal-flow sections with source-measured sizing in code, not CMS geometry. The homepage retains the source’s hidden common footer.

## Preview

http://127.0.0.1:4321/ serves the final local production build. Use npm run preview -- --port 4321 if restarting the server.

## WWS GitHub contract correction — 12 October 2026

A later check against existing WWS recreation repositories found that the initial pipeline-format `site.json`/`pages.json` and catch-all route were not the current GitHub import contract. They have been replaced with canonical `content.json` → `pageContent`, seven explicit route files, declarative rich text, section/flex regions and a normal-flow header. The original comparison scores above describe the earlier pixel-matching build; see WWS_IMPORT_CHECK.md and QA_IMPORT_VIEWPORTS.json for import-compatible verification. The fixed source header no longer remains fixed while scrolling. Contact configuration is now `pageContent["/contact"].form.endpoint`.
