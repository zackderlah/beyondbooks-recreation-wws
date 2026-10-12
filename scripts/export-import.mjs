import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
execFileSync(process.execPath, [path.join(root, 'scripts/validate-cms.mjs')], { stdio: 'inherit' });
const out = path.join(root, 'wws-import');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(path.join(out, 'cms'), { recursive: true });
fs.cpSync(path.join(root, 'src/cms'), path.join(out, 'cms'), { recursive: true });
fs.cpSync(path.join(root, 'public/assets'), path.join(out, 'assets'), { recursive: true });
const pages = JSON.parse(fs.readFileSync(path.join(root, 'src/cms/content.json'))).pageContent;
fs.writeFileSync(
  path.join(out, 'manifest.json'),
  JSON.stringify(
    {
      format: 'wws-recreation-pipeline',
      version: 1,
      site: 'beyondbooks',
      sourceUrl: 'https://www.beyondbooks.net.au/',
      framework: 'astro',
      content: {
        pageContent: 'cms/content.json',
        assets: 'cms/asset-map.json',
        schema: 'cms/schema.json',
      },
      routes: Object.values(pages).map((page) => ({ path: page.path, template: page.type })),
      assetBase: '/assets/',
      requiredConfiguration: ['contact form endpoint', 'confirm source email address', 'analytics'],
    },
    null,
    2,
  ) + '\n',
);
const project = path.join(out, 'project');
fs.mkdirSync(project, { recursive: true });
for (const name of [
  'src',
  'public',
  'scripts',
  'package.json',
  'package-lock.json',
  'astro.config.mjs',
  'tsconfig.json',
  'README.md',
  'RECREATION_REPORT.md',
  'WWS_IMPORT_CHECK.md',
  'AGENTS.md',
  '.cursor',
]) {
  const original = path.join(root, name);
  if (fs.existsSync(original)) fs.cpSync(original, path.join(project, name), { recursive: true });
}
console.log('Exported wws-import/ using this pipeline’s content contract.');
