<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useLocale } from '../composables/useLocale';
import { activeSection, sectionRequest } from '../composables/navigation';
import { localizePath, type Locale } from '../i18n/ui';
import { site } from '../config/site';
const { locale, t, localize } = useLocale();
const route = useRoute();
const open = ref(false);
const isHome = computed(() => route.name === 'home');
const current = computed(() => isHome.value ? activeSection.value : 'projects');
const items = ['top', 'projects', 'experience', 'info'] as const;
const names = { es: 'Español', en: 'English' };
const locales: Locale[] = ['es', 'en'];
function languagePath(code: Locale) {
 const path = route.path.replace(/^\/en(?=\/|$)/, '') || '/';
 const destination = isHome.value ? (activeSection.value === 'top' ? '/' : `/${activeSection.value}`) : path;
 return localizePath(destination, code);
}
watch(() => route.fullPath, () => { open.value = false; });
let abort: AbortController;
onMounted(() => {
 abort = new AbortController();
 document.addEventListener('keydown', e => { if (e.key === 'Escape') open.value = false; }, { signal: abort.signal });
 matchMedia('(min-width: 956px)').addEventListener('change', () => { open.value = false; }, { signal: abort.signal });
});
onBeforeUnmount(() => abort?.abort());
</script>
<template>
<aside data-sidenav :data-open="open ? '' : undefined" class="group/nav fixed inset-y-0 left-0 z-50 w-gutter border-r border-line bg-ink/0 transition-[width,background-color] duration-300 ease-out select-none data-open:w-[195px] data-open:bg-ink lg:w-auto lg:border-r-0">
 <button type="button" data-sidenav-toggle :aria-expanded="open" aria-controls="sidenav-menu" class="absolute top-[45%] left-1/2 origin-center -translate-x-1/2 -rotate-90 text-sm whitespace-nowrap transition-[left] duration-300 group-data-open/nav:left-[calc(100%-1.5rem)] lg:hidden" @click="open = !open">{{ t(open ? 'nav.close' : 'nav.open') }}</button>
 <div id="sidenav-menu" class="pointer-events-none opacity-0 transition-opacity duration-300 group-data-open/nav:pointer-events-auto group-data-open/nav:opacity-100 lg:pointer-events-auto lg:opacity-100">
  <nav :aria-label="t('nav.label')"><ol class="absolute top-[36%] left-2 flex flex-col items-start gap-y-5 lg:fixed lg:top-[79px] lg:left-6 lg:flex-row lg:gap-x-1 xl:left-24 xl:gap-x-5">
   <li v-for="item in items" :key="item"><RouterLink :to="localize(item === 'top' ? '/' : `/${item}`)" aria-current-value="" :data-sidenav-link="item" :aria-current="current === item ? 'location' : undefined" class="nav-text-link block rounded-full px-4 py-2 text-sm text-muted uppercase lg:px-3 lg:text-xs xl:px-4 xl:text-sm transition duration-300 hover:text-white active:text-accent aria-[current]:bg-gray-600/25 aria-[current]:font-semibold aria-[current]:text-white aria-[current]:shadow-md" @click="open = false; sectionRequest = { id: item }">{{ t(`nav.${item}`) }}</RouterLink></li>
  </ol></nav>
  <div class="absolute bottom-6 left-6 flex flex-col items-start gap-2 font-mono text-[10px] leading-relaxed text-muted uppercase lg:fixed xl:left-24">
   <nav data-lang-switcher :aria-label="t('lang.label')" class="flex items-center gap-3">
    <RouterLink v-for="code in locales" :key="code" :to="languagePath(code)" :hreflang="code" :lang="code" :aria-label="names[code]" aria-current-value="" :aria-current="code === locale ? 'true' : undefined" class="language-link py-1 text-[11px] font-medium tracking-wider text-dim transition duration-200 aria-[current=true]:text-white">{{ code.toUpperCase() }}</RouterLink>
   </nav>
   <span>© {{ new Date().getFullYear() }} {{ site.name }}</span>
  </div>
 </div>
</aside>
</template>

<style scoped>
.nav-text-link:not([aria-current="location"]):hover,
.nav-text-link:not([aria-current="location"]):focus-visible {
 text-shadow: 0 0 6px rgb(203 164 255 / 0.6), 0 0 16px rgb(203 164 255 / 0.3);
}

.language-link:hover,
.language-link:focus-visible {
 color: #fff;
 text-shadow: 0 0 6px rgb(193 194 218 / 0.9), 0 0 16px rgb(167 132 255 / 0.8), 0 0 28px rgb(167 132 255 / 0.45);
}
</style>
