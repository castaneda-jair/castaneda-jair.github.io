export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const es = {
  "meta.title": "Jair C. — Portfolio",
  "meta.description":
    "Desarrollador de software con más de 2 años de experiencia en aplicaciones web y móviles, interesado en datos y machine learning.",
  "nav.label": "Navegación principal",
  "nav.top": "Top",
  "nav.projects": "Projects",
  "nav.info": "Info",
  "nav.open": "tap to open",
  "nav.close": "tap to close",
  "hero.greeting": "hello, Jair here",
  "hero.role": "Software Engineer",
  "hero.scroll": "scroll",
  "projects.title": "Projects",
  "projects.count": "{n} ITEMS",
  "projects.demo": "Demo",
  "projects.repo": "Ver repositorio de {title} en GitHub",
  "projects.live": "En línea",
  "projects.offline": "Fuera de línea",
  "carousel.prev": "Imagen anterior",
  "carousel.next": "Imagen siguiente",
  "carousel.goTo": "Ir a la imagen {n}",
  "carousel.label": "Capturas de {title}",
  "info.title": "Info",
  "info.profile": "Profile",
  "info.photoAlt": "Foto de perfil de Jair",
  "info.description":
    "Hola, me llamo Jair. Soy desarrollador de software por más de 2 años, me he especializado en el desarrollo de aplicaciones web y móviles. Aunque no es la única área que disfruto, estoy iniciando por aprender sobre data science y machine learning. Me apasiona el trabajo con datos y la sensación de aprender cosas nuevas; siempre estoy buscando algo nuevo para aprender y mejorar mis habilidades.",
  "info.education": "Education",
  "projects.viewFull": "Ver proyecto completo",
  "projects.source": "Código",
  "projects.playVideo": "Reproducir {title}",
  "projects.videoError": "No se pudo cargar el video.",
  "projects.openVideo": "Abrir video",
  "projects.features": "Features",
  "projects.stack": "Stack",
  "projects.media": "Capturas y videos",
  "projects.backToIndex": "Volver al índice",
  "projects.next": "Siguiente",
  "info.contact": "Contact",
  "nav.experience": "Experience",
  "experience.title": "Experience",
  "experience.count": "{n} ITEMS",
  "experience.countOne": "1 ITEM",
  "experience.present": "Presente",
  "experience.cv": "Descargar CV",
  "info.contactNote": "Abierto a oportunidades como desarrollador y a proyectos freelance. Para consultas, escríbeme por correo:",
  "info.copyEmail": "Copiar e-mail",
  "info.copied": "Copiado",
  "info.copiedAnnounce": "Correo copiado al portapapeles",
  "lang.label": "Idioma",
  "404.title": "Página no encontrada",
  "404.back": "Volver al inicio",
};

type Key = keyof typeof es;

const en: Record<Key, string> = {
  "meta.title": "Jair C. — Portfolio",
  "meta.description":
    "Software developer with 2+ years building web and mobile applications, getting into data and machine learning.",
  "nav.label": "Main navigation",
  "nav.top": "Top",
  "nav.projects": "Projects",
  "nav.info": "Info",
  "nav.open": "tap to open",
  "nav.close": "tap to close",
  "hero.greeting": "hello, Jair here",
  "hero.role": "Software Engineer",
  "hero.scroll": "scroll",
  "projects.title": "Projects",
  "projects.count": "{n} ITEMS",
  "projects.demo": "Demo",
  "projects.repo": "View {title} repository on GitHub",
  "projects.live": "Online",
  "projects.offline": "Offline",
  "carousel.prev": "Previous image",
  "carousel.next": "Next image",
  "carousel.goTo": "Go to image {n}",
  "carousel.label": "{title} screenshots",
  "info.title": "Info",
  "info.profile": "Profile",
  "info.photoAlt": "Profile photo of Jair",
  "info.description":
    "Hi, my name is Jair. I've been a software developer for over two years, specializing in web and mobile application development. Although it's not the only field I enjoy, I'm starting to learn about data science and machine learning. I'm passionate about working with data and the thrill of learning new things; I'm always looking for something new to learn and improve my skills.",
  "info.education": "Education",
  "projects.viewFull": "View full project",
  "projects.source": "Source",
  "projects.playVideo": "Play {title}",
  "projects.videoError": "The video could not be loaded.",
  "projects.openVideo": "Open video",
  "projects.features": "Features",
  "projects.stack": "Stack",
  "projects.media": "Screenshots and videos",
  "projects.backToIndex": "Back to index",
  "projects.next": "Next",
  "info.contact": "Contact",
  "nav.experience": "Experience",
  "experience.title": "Experience",
  "experience.count": "{n} ITEMS",
  "experience.countOne": "1 ITEM",
  "experience.present": "Present",
  "experience.cv": "Download CV",
  "info.contactNote": "Open to developer roles and freelance projects. For inquiries, reach out via email:",
  "info.copyEmail": "Copy e-mail",
  "info.copied": "Copied",
  "info.copiedAnnounce": "Email copied to clipboard",
  "lang.label": "Language",
  "404.title": "Page not found",
  "404.back": "Back to home",
};

const dictionaries: Record<Locale, Record<Key, string>> = { es, en };

/** Returns a typed translator for the given locale. `{name}` placeholders are interpolated. */
export function useTranslations(locale: Locale) {
  return (key: Key, vars: Record<string, string | number> = {}) =>
    dictionaries[locale][key].replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

/** Prefixes a path with the locale segment (default locale has no prefix). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean === "/" ? "/" : clean}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

/** `getStaticPaths` entries for the optional `[...lang]` route segment. */
export const localeParams = () => locales.map((l) => ({ params: { lang: l === defaultLocale ? undefined : l } }));

/** Resolves the `[...lang]` param back to a Locale. */
export const toLocale = (lang: string | undefined): Locale => (locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale);
