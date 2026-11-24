<script setup lang="ts">
import Section from './Section.vue';
import TechBadge from './TechBadge.vue';
import { companies, period } from '../lib/content';
import { education } from '../data/education';
import { site } from '../config/site';
import { useLocale } from '../composables/useLocale';
const { locale, t } = useLocale();
const dash = 'relative pl-[1.5em] before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-[1em] before:bg-rule';
</script>
<template>
<Section id="experience" :title="t('experience.title')" :reveal="false" fit>
 <a v-if="site.cvUrl" :href="site.cvUrl" download class="mb-12 inline-flex h-[35px] items-center rounded-[4px] bg-chip px-2.5 font-display text-xs font-bold uppercase transition-colors duration-200 hover:bg-hot hover:text-ink active:bg-hot-pressed active:text-white">{{ t('experience.cv') }} ↓</a>
 <ol class="flex flex-col gap-y-[2.5em]">
  <li v-for="(group, groupIndex) in companies" :key="group.company" data-reveal="up" :data-reveal-delay="Math.min(groupIndex, 8) * 60">
   <h3 class="font-display text-sm leading-normal font-bold"><a :href="group.url" target="_blank" rel="noopener noreferrer" class="transition-colors duration-200 hover:text-white/70">{{ group.company }} <span aria-hidden="true" class="text-xs text-dim">↗</span></a></h3>
   <p class="mt-0.5 font-mono text-[10px] tracking-wider text-dim uppercase">{{ [group.employment?.[locale], group.location?.[locale]].filter(Boolean).join(' · ') }}</p>
   <ol class="border-l border-rule pl-4 mt-3 flex flex-col gap-4">
    <li v-for="(role, roleIndex) in group.roles" :key="role.id" class="relative" :class="{ 'before:absolute before:top-[0.45em] before:-left-[calc(1rem+3px)] before:size-[5px] before:rounded-full before:bg-dim': !(groupIndex === 0 && roleIndex === 0 && role.end === null) }">
     <span v-if="groupIndex === 0 && roleIndex === 0 && role.end === null" aria-hidden="true" class="absolute top-[0.3em] -left-[calc(1rem+5px)] grid size-[9px] place-items-center"><span class="absolute inset-0 animate-ping rounded-full bg-accent/30 motion-reduce:hidden"></span><span class="relative size-[7px] rounded-full bg-accent shadow-[0_0_6px_1px_rgb(203_164_255/0.25)]"></span></span>
     <details :name="`roles-${group.company}`" :open="groupIndex === 0 && roleIndex === 0 && role.end === null" class="group/role">
      <summary class="flex w-fit cursor-pointer list-none flex-wrap items-baseline gap-x-3 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
       <span class="text-xs font-bold underline-offset-4 group-hover/role:underline" :class="{ 'text-accent': groupIndex === 0 && roleIndex === 0 && role.end === null }">{{ role.role }}</span>
       <time :datetime="role.start" class="font-mono text-[11px] text-dim">{{ period(role.start, role.end, t('experience.present')) }}</time>
       <span aria-hidden="true" class="font-mono text-[11px] text-dim transition-transform duration-300 group-open/role:rotate-45">+</span>
      </summary>
      <div class="animate-panel-in">
       <ul class="mt-2 flex flex-wrap gap-[5px]"><li v-for="id in role.stack" :key="id"><TechBadge :id="id" compact/></li></ul>
       <div class="mt-2 flex max-w-[44em] flex-col">
        <details v-for="(h, i) in role.highlights" :key="i" :name="`highlights-${role.id}`" class="group/h border-t border-line last:border-b">
         <summary class="flex cursor-pointer list-none items-baseline gap-3 py-1.5 text-xs transition-colors hover:text-white [&::-webkit-details-marker]:hidden"><span class="font-mono text-[10px] text-dim">{{ String(i + 1).padStart(2, '0') }}</span><span class="shrink-0 font-bold">{{ h.title[locale] }}</span><span class="hidden min-w-0 flex-1 truncate text-gray-400 sm:inline group-open/h:invisible">{{ h.short[locale] }}</span><span aria-hidden="true" class="ml-auto shrink-0 font-mono text-dim transition-transform duration-300 group-open/h:rotate-45">+</span></summary>
         <div class="animate-panel-in pb-3 pl-[calc(1.5em+0.75rem)]"><p class="text-xs leading-[1.7] text-gray-300">{{ h.detail[locale] }}</p><ul class="mt-1.5 flex flex-wrap gap-[5px]"><li v-for="id in h.stack" :key="id"><TechBadge :id="id" compact/></li></ul></div>
        </details>
       </div>
      </div>
     </details>
    </li>
   </ol>
  </li>
 </ol>
 <div role="group" aria-labelledby="experience-education-title" class="mt-[100px] lg:mt-auto lg:mb-0 lg:pt-8">
  <h3 id="experience-education-title" class="font-display text-xl leading-none font-bold tracking-[-0.04em] uppercase lg:text-2xl">{{ t('info.education') }}</h3>
  <ul class="mt-[50px] flex flex-col gap-y-5 text-xs font-bold leading-[1.8] lg:mt-[min(32px,3vh)]"><li v-for="item in education" :key="item.school" :class="dash"><span class="block">{{ item.school }}</span><span v-if="item.degree" class="mt-0.5 block font-normal text-gray-300">{{ item.degree[locale] }}</span><span class="mt-1 block font-mono text-[11px] font-normal text-dim">{{ item.start }} — {{ item.end ?? t('experience.present') }}</span></li></ul>
 </div>
</Section>
</template>
