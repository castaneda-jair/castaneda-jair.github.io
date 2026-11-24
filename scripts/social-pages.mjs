import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { loadEnv } from 'vite';
import projects from '../src/content/projects.json' with { type: 'json' };
import { getMetadata } from '../src/lib/metadata.ts';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const origin = env.VITE_SITE_URL;
const template = await readFile('dist/index.html', 'utf8');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function head(path) {
 const m = getMetadata(path, origin);
 const tags = [
  ['name', 'description', m.description], ['property', 'og:type', 'website'],
  ['property', 'og:site_name', 'Jair C.'], ['property', 'og:title', m.title],
  ['property', 'og:description', m.description], ['property', 'og:url', m.url],
  ['property', 'og:image', m.image], ['property', 'og:image:secure_url', m.image],
  ['property', 'og:image:type', 'image/jpeg'], ['property', 'og:image:width', '1200'],
  ['property', 'og:image:height', '630'], ['property', 'og:image:alt', m.title],
  ['property', 'og:locale', m.locale === 'es' ? 'es_ES' : 'en_US'],
  ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', m.title],
  ['name', 'twitter:description', m.description], ['name', 'twitter:image', m.image],
 ];
 return `<!-- social:start -->
<title>${escape(m.title)}</title>
${tags.map(([attr,key,value]) => `<meta ${attr}="${key}" content="${escape(value)}" />`).join('\n')}
<!-- social:end -->`;
}
for (const prefix of ['', '/en']) {
 for (const route of ['/', '/projects', '/experience', '/info', ...projects.map(p => `/projects/${p.id}/`)]) {
  const path = prefix + route;
  const html = template.replace(/<!-- social:start -->[\s\S]*?<!-- social:end -->/, head(path)).replace('<html lang="es">', `<html lang="${prefix ? 'en' : 'es'}">`);
  const folder = join('dist', path);
  await mkdir(folder, { recursive: true }); await writeFile(join(folder, 'index.html'), html);
  // Also serve clean URLs on hosts that resolve /section through /section.html.
  if (!path.endsWith('/')) await writeFile(join('dist', path + '.html'), html);
 }
}
console.log('Social metadata written into HTML for every home and project route.');
