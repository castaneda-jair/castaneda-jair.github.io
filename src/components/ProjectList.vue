<script setup lang="ts">
import { projects } from '../lib/content';
import { useLocale } from '../composables/useLocale';
defineProps<{ activeId?: string; onProjectPage?: boolean }>();
const emit = defineEmits<{ preview: [id: string] }>();
const { localize } = useLocale();
function preview(id: string) { if (matchMedia('(min-width: 956px)').matches) emit('preview', id); }
</script>
<template>
<div class="lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:[scrollbar-width:none]">
 <ul class="flex flex-col items-end gap-9 pr-6 pb-24 lg:pt-[207px] lg:pr-3">
  <li v-for="(project, i) in projects" :key="project.id" class="flex w-full justify-end">
   <RouterLink :to="localize(`/projects/${project.id}/`)" :data-project-card="project.id" :data-active="project.id === activeId ? '' : undefined" :aria-current="onProjectPage && project.id === activeId ? 'page' : undefined" class="group/card relative flex w-full max-w-[19rem] gap-3" @pointerenter="preview(project.id)" @focus="preview(project.id)">
    <span class="pt-2 font-mono text-xs text-gray-500 transition-colors duration-200 group-hover/card:text-white group-focus-visible/card:text-white group-data-active/card:text-white">#{{ String(i + 1).padStart(2, '0') }}</span>
    <span class="flex min-w-0 flex-1 flex-col gap-1">
     <span class="relative block overflow-hidden"><img :src="project.cover" alt="" width="640" height="360" sizes="17rem" loading="lazy" class="h-[120px] w-full object-cover object-left-top opacity-85 transition duration-500 ease-out-soft group-hover/card:scale-[1.03] group-hover/card:opacity-100 group-hover/card:brightness-110 group-focus-visible/card:opacity-100 group-focus-visible/card:brightness-110 group-data-active/card:opacity-100"/><span aria-hidden="true" class="absolute top-1/2 left-4 grid size-7 -translate-y-1/2 scale-50 place-items-center rounded-full bg-white/90 text-sm text-ink opacity-0 transition duration-300 ease-out-soft group-hover/card:scale-100 group-hover/card:opacity-100 group-focus-visible/card:scale-100 group-focus-visible/card:opacity-100">→</span></span>
     <span class="text-end text-sm leading-tight font-medium text-gray-300 transition-colors duration-200 group-hover/card:text-white group-focus-visible/card:text-white group-data-active/card:text-white">{{ project.title }}</span>
    </span>
   </RouterLink>
  </li>
 </ul>
</div>
</template>
