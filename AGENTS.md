# Beyond Books WWS site

Read .cursor/rules/wws-github-import.mdc before editing. src/cms/content.json is the single editable content source, with pageContent keyed by original route; the home entry includes shared site fields. Keep one Astro file per URL. Use authored flex sections, local assets and declarative maps; preserve the source design. Do not create pages.json, a wws/ folder, HTML injection or fixed chrome. Run npm run check and npm run build before pushing. The contact form endpoint remains an import-time configuration requirement.

A source build never establishes WWS import readiness. Run the actual converter gate documented in WWS_IMPORT_CHECK.md and preserve the current `needs-review` status until native layout and interactions are verified using the deployed reviewed importer.
