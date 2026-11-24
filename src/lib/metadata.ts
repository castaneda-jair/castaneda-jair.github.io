import projects from '../content/projects.json' with { type: 'json' };
import { site } from '../config/site.ts';
import { useTranslations } from '../i18n/ui.ts';
export function getMetadata(path: string, origin = site.url as string) {
 const locale = path === '/en' || path.startsWith('/en/') ? 'en' : 'es';
 const t = useTranslations(locale);
 const slug = path.match(/\/projects\/([^/]+)/)?.[1];
 const project = projects.find(p => p.id === slug);
 return {
  locale,
  title: project ? `${project.title} — ${site.name}` : t('meta.title'),
  description: project?.description[locale] ?? t('meta.description'),
  url: new URL(path, origin).href,
  image: new URL(`/og/${project ? project.id : 'projects-preview'}.jpg`, origin).href,
 };
}
export function updateMetadata(path: string) {
 const metadata = getMetadata(path, import.meta.env.VITE_SITE_URL || site.url);
 document.documentElement.lang = metadata.locale;
 document.title = metadata.title;
 const tags = [
  ['name', 'description', metadata.description],
  ['property', 'og:type', 'website'], ['property', 'og:site_name', site.name],
  ['property', 'og:title', metadata.title], ['property', 'og:description', metadata.description],
  ['property', 'og:url', metadata.url], ['property', 'og:image', metadata.image],
  ['property', 'og:image:secure_url', metadata.image], ['property', 'og:image:type', 'image/jpeg'],
  ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
  ['property', 'og:image:alt', metadata.title], ['property', 'og:locale', metadata.locale === 'es' ? 'es_ES' : 'en_US'],
  ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', metadata.title],
  ['name', 'twitter:description', metadata.description], ['name', 'twitter:image', metadata.image],
 ];
 for (const [attr, name, content] of tags) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr!, name!); document.head.append(tag); }
  tag.content = content!;
 }
}
