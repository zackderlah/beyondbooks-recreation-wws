import Ajv2020 from 'ajv/dist/2020.js';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const cms = path.join(root, 'src/cms');
const content = JSON.parse(fs.readFileSync(path.join(cms, 'content.json')));
const pages = content.pageContent;
const site = pages['/'].site;
const schema = JSON.parse(fs.readFileSync(path.join(cms, 'schema.json')));
const ajv = new Ajv2020({ strict: false, allErrors: true });
const validate = ajv.compile(schema);
assert.ok(validate(content), JSON.stringify(validate.errors));
const routes = new Set([
  '/',
  '/contact',
  '/why-choose-beyond-books',
  '/bookkeeping',
  '/software-solutions',
  '/streamlining-systems',
  '/about',
]);
assert.equal(site.name, 'Beyond Books Qld');
assert.equal(Object.keys(pages).length, 7);
const allowedTypes = [
  'home',
  'benefits',
  'service',
  'software',
  'streamlining',
  'about',
  'contact',
];
function inspect(value, key = '') {
  if (value === null) return;
  if (Array.isArray(value)) {
    value.forEach((x) => inspect(x, key));
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      assert.ok(
        !['html', 'css', 'style', 'x', 'y', 'left', 'top', 'position'].includes(k),
        `CMS exposes structural field: ${k}`,
      );
      inspect(v, k);
    }
    return;
  }
  if (typeof value !== 'string') return;
  if (value.startsWith('/assets/'))
    assert.ok(fs.existsSync(path.join(root, 'public', value)), `Missing local asset: ${value}`);
  if (key === 'src')
    assert.ok(
      value.startsWith('/assets/') ||
        value.startsWith('data:') ||
        value.startsWith('https://player.vimeo.com/video/'),
      `Unexpected media source: ${value}`,
    );
  if (key === 'type' && ['p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol'].includes(value)) return;
  if (key === 'href' && value.startsWith('/'))
    assert.ok(routes.has(value), `Unknown route: ${value}`);
  if (key === 'href') assert.ok(!/^javascript:/i.test(value), 'Unsafe link');
}
for (const [route, page] of Object.entries(pages)) {
  assert.ok(routes.has(route));
  assert.equal(page.path, route);
  assert.ok(allowedTypes.includes(page.type));
  assert.ok(page.seo.title);
  const file = route === '/' ? 'index.astro' : route.slice(1) + '.astro';
  assert.ok(fs.existsSync(path.join(root, 'src/pages', file)), `Missing page file: ${file}`);
  inspect(page);
}
inspect(site);
assert.ok(!fs.existsSync(path.join(cms,'pages.json')), 'WWS forbids pages.json');
assert.ok(!fs.existsSync(path.join(root,'wws')), 'WWS forbids a wws/ folder');
const css = fs.readFileSync(path.join(root,'src/styles/site.css'),'utf8');
assert.ok(!/display:\s*(?:inline-)?grid\b|grid-template-/i.test(css), 'WWS templates must use flex');
const headerRule = css.match(/\.site-header\s*\{[^}]+\}/)?.[0] || '';
assert.ok(!/position:\s*fixed/.test(headerRule), 'WWS header must survive import in normal flow');
function checkTemplates(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())checkTemplates(p);else if(entry.name.endsWith('.astro')){const source=fs.readFileSync(p,'utf8');assert.ok(!/set:html|innerHTML/.test(source), `Unsupported HTML injection: ${p}`);}}}
checkTemplates(path.join(root,'src'));
console.log(
  'Source structure validation passed: 7 page files and pageContent entries, local assets, flex layout, no pages.json or raw HTML fields. Actual WWS ingestion is not verified by this check.',
);
