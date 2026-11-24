<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import Section from './Section.vue';
import { useLocale } from '../composables/useLocale';
import { profileLinks, site } from '../config/site';
const { t } = useLocale();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout>;
async function copy(event: MouseEvent) {
 if (!navigator.clipboard) return;
 event.preventDefault();
 try { await navigator.clipboard.writeText(site.email); } catch { location.href = `mailto:${site.email}`; return; }
 copied.value = true; clearTimeout(timer); timer = setTimeout(() => copied.value = false, 1800);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
<Section id="info" :title="t('info.title')">
 <div role="group" aria-labelledby="info-profile">
  <h3 id="info-profile" class="font-display text-xl leading-none font-bold tracking-[-0.04em] uppercase lg:text-2xl">{{ t('info.profile') }}</h3>
  <div class="mt-[50px]">
   <div class="flex flex-col gap-[25px] sm:flex-row"><img src="/images/profile_1.png" :alt="t('info.photoAlt')" width="300" height="300" loading="lazy" class="size-[150px] shrink-0 object-cover object-top brightness-[0.99] contrast-110 saturate-[0.83]"/><p class="max-w-[40em] text-xs leading-[1.8] font-medium sm:-mt-[0.5em]">{{ t('info.description') }}</p></div>
   <ul class="mt-[25px] flex flex-col items-start gap-[5px] sm:flex-row"><li v-for="link in profileLinks" :key="link.id"><a :href="link.href" target="_blank" rel="noopener noreferrer" class="inline-flex h-[35px] items-center rounded-[4px] bg-chip px-2.5 font-display text-xs font-bold transition-colors duration-200 hover:bg-hot hover:text-ink active:bg-hot-pressed active:text-white focus-visible:bg-hot focus-visible:text-ink">{{ link.label }}</a></li></ul>
  </div>
 </div>
 <div role="group" aria-labelledby="info-contact" class="mt-[100px]">
  <h3 id="info-contact" class="font-display text-xl leading-none font-bold tracking-[-0.04em] uppercase lg:text-2xl">{{ t('info.contact') }}</h3>
  <div class="mt-[50px]"><p class="max-w-[40em] text-xs leading-[1.8] font-medium">{{ t('info.contactNote') }}</p>
   <div class="mt-[25px]">
    <a :href="`mailto:${site.email}`" :data-copied="copied ? '' : undefined" class="group relative inline-grid overflow-hidden pl-[1.5em] font-display text-xs leading-normal font-bold whitespace-nowrap uppercase before:absolute before:top-1/2 before:left-0 before:h-px before:w-[1em] before:bg-rule" @click="copy">
     <span class="col-start-1 row-start-1 transition duration-300 ease-out-soft group-hover:-translate-y-full group-hover:opacity-0 group-focus-visible:-translate-y-full group-focus-visible:opacity-0 group-data-copied:-translate-y-full group-data-copied:opacity-0">{{ site.email }}</span>
     <span aria-hidden="true" class="col-start-1 row-start-1 translate-y-full opacity-0 transition duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-data-copied:-translate-y-full! group-data-copied:opacity-0!">{{ t('info.copyEmail') }}</span>
     <span aria-hidden="true" class="col-start-1 row-start-1 translate-y-full opacity-0 transition duration-300 ease-out-soft group-data-copied:translate-y-0 group-data-copied:opacity-100">{{ t('info.copied') }}</span>
    </a><span class="sr-only" role="status">{{ copied ? t('info.copiedAnnounce') : '' }}</span>
   </div>
  </div>
 </div>
</Section>
</template>
