# Portfolio Vue — Jair C.

Vue 3, Vue Router, TypeScript y Tailwind CSS 4. Migración del portfolio de Astro a una SPA: navegación interna, idiomas, previews y carrusel funcionan con estado de Vue sin recargar el documento.

## Uso

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
```

Requiere Node >=22.18 (Node 24 recomendado). `npm run build` comprueba los tipos y genera `dist/`. Los tests usan Playwright (también aceptan `PLAYWRIGHT_CHANNEL=chrome` para usar Chrome instalado): instalar Chromium con `npx playwright install chromium` si aún no está disponible.

## Contenido y diseño

- `src/content/projects.json`: proyectos en ambos idiomas, orden y medios; imágenes en `public/images/projects/`.
- `src/content/experience.json`: experiencia. Los borradores se omiten en producción.
- `src/data/education.ts` y `src/data/stack.ts`: educación y tecnologías.
- `src/i18n/ui.ts`: textos ES/EN.
- `src/config/site.ts`: datos personales, enlaces y el identificador existente de Google Analytics. En producción se registra una vista por cambio de página, sin duplicarla por cambiar de sección.
- `src/components/`: componentes Vue con estado reactivo, eventos y limpieza al desmontarse.
- Koyora incluye dos recorridos en MP4/H.264 con `faststart` y posters WebP. Los dos videos se muestran en una columna con explicaciones técnicas. Cada reproductor monta el archivo al pulsar reproducir, pausa el otro video al arrancar y libera el archivo al salir. Los medios tienen nombres con hash y caché inmutable; no se descargan videos al abrir el índice o una ficha.
- `src/styles/global.css`: diseño adaptable con desplazamiento vertical en escritorio y móvil.

Rutas: `/`, `/en/`, `/projects/:slug/`, `/en/projects/:slug/`. Las secciones usan rutas directas `/projects`, `/experience` e `/info` (también bajo `/en`), sin fragmentos `#`. Los marcadores antiguos se convierten a las rutas directas. Atrás/adelante se maneja con Vue Router.

## LinkedIn y Facebook

El build escribe etiquetas Open Graph en el HTML de todas las rutas, incluyendo título, descripción, URL, imagen JPEG pública de 1200×630 e idioma. Los scrapers las reciben sin ejecutar JavaScript. Solo se genera el encabezado social; el contenido y la navegación se renderizan con Vue en el navegador. Se incluyen tarjetas para Twitter/X.

Las imágenes sociales existentes están en `public/og/`. Al añadir un proyecto, agregar también `public/og/<id>.jpg`. Tras cambiar contenido o imágenes, ejecutar el build y desplegar nuevamente; las plataformas pueden conservar su caché de vistas previas.

Antes de publicar bajo otro dominio, copiar `.env.example` a `.env` y configurar `VITE_SITE_URL` con el origen público. Usar el mismo valor en el build: las URLs sociales deben ser absolutas y accesibles públicamente.

## Hosting

Publicar el directorio `dist/`. El hosting debe servir primero los archivos HTML existentes de cada ruta y usar `index.html` como fallback para las demás rutas de la SPA. Esto conserva los metadatos propios al compartir directamente un proyecto y permite abrir rutas profundas.

El despliegue automático activo usa Cloudflare Pages en `https://castaneda-jair.pages.dev`, conectado a `main`. Se conserva `wrangler.jsonc` como configuración opcional para publicar los archivos en un Worker con fallback de SPA.
