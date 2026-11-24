<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../lib/content';
import { useLocale } from '../composables/useLocale';
import { useReveal } from '../composables/useReveal';
import ProjectList from '../components/ProjectList.vue';
import ProjectLinks from '../components/ProjectLinks.vue';
import TechBadge from '../components/TechBadge.vue';
import MediaFrame from '../components/MediaFrame.vue';
import ProjectVideos from '../components/ProjectVideos.vue';
const route = useRoute();
const { locale, t, localize } = useLocale();
const project = computed(() => projects.find(p => p.id === route.params.slug)!);
const next = computed(() => projects[(projects.findIndex(p => p.id === project.value.id) + 1) % projects.length]!);
const chip = 'inline-flex h-[35px] items-center gap-2 rounded-[4px] bg-rule px-2.5 font-mono text-xs uppercase transition-colors duration-200 hover:bg-hot hover:text-ink active:bg-hot-pressed active:text-white';
useReveal();
</script>
<template>
<main v-if="project" class="ml-[65px]">
 <div class="relative min-h-dvh lg:grid lg:grid-cols-[var(--spacing-rail)_minmax(0,1fr)]">
  <ProjectList :active-id="project.id" on-project-page class="hidden lg:block"/>
  <div class="relative min-w-0"><div aria-hidden="true" class="absolute inset-y-0 left-0 hidden w-px bg-line lg:block"></div><div class="px-4 pt-6 lg:pr-[10px] lg:pl-4" data-reveal="up">
   <article class="pb-24">
    <header><h1 class="-mt-[0.1em] -ml-[0.06em] font-display text-[36px] leading-[0.95] font-bold tracking-[-0.04em] uppercase lg:text-[4.5vw]">{{ project.title }}</h1><div class="mt-2.5"><ProjectLinks :project="project" large/></div></header>
    <section class="mt-10" aria-labelledby="stack-title"><h2 id="stack-title" class="font-display text-xl leading-none font-bold tracking-[-0.04em] uppercase">{{ t('projects.stack') }}</h2><ul class="mt-5 flex flex-wrap gap-2"><li v-for="id in project.stack" :key="id"><TechBadge :id="id"/></li></ul></section>
    <div class="mt-12 flex max-w-[40em] flex-col gap-[1em] text-[13px] leading-[1.8] font-medium"><p v-for="paragraph in project.content[locale]" :key="paragraph">{{ paragraph }}</p></div>
    <ProjectVideos v-if="project.videos.length" :key="project.id" :videos="project.videos" class="mt-12"/>
    <section v-if="project.features[locale].length" class="mt-[100px]" aria-labelledby="features-title"><h2 id="features-title" class="font-display text-xl leading-none font-bold tracking-[-0.04em] uppercase">{{ t('projects.features') }}</h2><ul class="mt-[30px] flex flex-col gap-y-[1em] text-xs leading-[1.8] font-bold"><li v-for="feature in project.features[locale]" :key="feature" class="relative pl-[1.5em] before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-[1em] before:bg-rule">{{ feature }}</li></ul></section>
    <section class="mt-[100px] flex flex-col gap-2.5" :aria-label="t('projects.media')">
     <figure v-for="(image, i) in project.gallery" :key="image.src" data-reveal="up"><MediaFrame><img :src="image.src" :alt="image.caption?.[locale] ?? `${project.title} — ${i + 1}`" :loading="i === 0 && !project.videos.length ? 'eager' : 'lazy'" class="h-auto w-full"/></MediaFrame><figcaption v-if="image.caption" class="mt-2 font-mono text-[11px] text-dim">{{ image.caption[locale] }}</figcaption></figure>
    </section>
    <nav class="mt-[100px] flex flex-wrap items-center gap-[5px]" :aria-label="t('projects.title')"><RouterLink :to="localize('/projects')" :class="chip">← {{ t('projects.backToIndex') }}</RouterLink><RouterLink v-if="projects.length > 1" :to="localize(`/projects/${next.id}/`)" :class="chip">{{ t('projects.next') }}: {{ next.title }} →</RouterLink></nav>
   </article>
  </div></div>
 </div>
</main>
</template>
