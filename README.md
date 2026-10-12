# Beyond Books — WWS recreation

Seven pages recreated from https://www.beyondbooks.net.au/ using Astro, TypeScript and Tailwind, with the file contract used by existing Working Websites Studio GitHub imports.

## Import into WWS

Select this GitHub repository in WWS. The repository root is the project root; build command is `npm run build`, static output is `dist/`, Node version is 24.

- `src/cms/content.json` is the single editable content source: `{ "pageContent": { "/": {}, "/about": {} } }`.
- Each original URL has a matching Astro file in `src/pages/`, including `index.astro` for home.
- Shared site fields live in `pageContent["/"].site`.
- Page files pass their page object into `src/templates/PageTemplate.astro`.
- Components render fields and repeating lists declaratively. No HTML injection is used.
- Original images, icons and fonts are local in `public/assets/` and use `/assets/...` URLs.
- Visible regions use sections and flex layouts. The header uses normal document flow to survive import.
- There is no `src/cms/pages.json` or `wws/` folder.

The exact contract is [.cursor/rules/wws-github-import.mdc](.cursor/rules/wws-github-import.mdc), copied from the existing Alison Greenway Art and Dolley Concreting recreation repositories. The source design is retained; the fixed source header becomes a normal-flow header for importer compatibility.

## Check and run

```bash
npm ci
npm run check
npm run build
npm run preview -- --port 4321
```

`npm run check` validates the CMS schema, route files, local asset references and WWS file/layout restrictions, then runs Astro checks. GitHub Actions runs these checks and the build on pushes and pull requests.

`npm run import:export` produces an optional `wws-import/` bundle containing a manifest, `cms/content.json`, assets and the complete project. The generated directory is ignored by Git; GitHub import uses the repository source directly.

## Configuration after import

The contact form’s original WebWave receiver is not portable. Set `pageContent["/contact"].form.endpoint` to the WWS receiver accepting POST JSON: name, email, phone, interest, message. Until then, submit opens an email draft and never claims delivery.

The source email is `melissa_plant@bipond.com`; confirm its spelling before production. Preserve the four Vimeo embeds and telephone/social links. Configure your own analytics. The original footer credit is retained for fidelity; the shipped runtime is Astro.

## Source capture

From the sibling pipeline:

```bash
npm run recreate -- https://www.beyondbooks.net.au/
npm run prepare:site -- --config=sites/beyondbooks.json --website-dir=../beyondbooks-recreation-wws
```

Do not reimport source capture over later client CMS edits unless intentional. See [RECREATION_REPORT.md](RECREATION_REPORT.md) and [WWS_IMPORT_CHECK.md](WWS_IMPORT_CHECK.md) for visual and import verification limits.
