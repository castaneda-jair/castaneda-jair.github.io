<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useLocale } from '../composables/useLocale';
import { activeSection, sectionRequest } from '../composables/navigation';
import { useReveal } from '../composables/useReveal';
import { projects } from '../lib/content';
import Typewriter from '../components/Typewriter.vue';
import ProjectList from '../components/ProjectList.vue';
import Carousel from '../components/Carousel.vue';
import ProjectLinks from '../components/ProjectLinks.vue';
import TechBadge from '../components/TechBadge.vue';
import ExperienceSection from '../components/ExperienceSection.vue';
import AboutSection from '../components/AboutSection.vue';
const { locale, t, localize } = useLocale();
const route = useRoute();
const main = ref<HTMLElement>();
const selected = ref(projects[0]!.id);
let observer: IntersectionObserver;
function goToSection(id: string, animate = true) {
 const section = main.value?.querySelector<HTMLElement>(`:scope > section#${id}`);
 if (!section) return;
 activeSection.value = id;
 section.scrollIntoView({ behavior: animate && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant', block: 'start' });
}
useReveal();
onMounted(() => {
 const initial = String(route.params.section || 'top');
 if (!main.value) return;
 goToSection(initial, false);
 observer = new IntersectionObserver(entries => { const visible = entries.find(e => e.isIntersecting); if (visible) activeSection.value = visible.target.id; }, { rootMargin: '-49% 0px -49% 0px' });
 main.value.querySelectorAll(':scope > section').forEach(el => observer.observe(el));
});
watch(() => route.params.section, section => { if (route.name === 'home') goToSection(String(section || 'top')); });
watch(sectionRequest, request => { if (request && route.name === 'home') goToSection(request.id); });
onBeforeUnmount(() => observer?.disconnect());
</script>
<template>
<main ref="main" class="ml-[65px]">
 <section id="top" :aria-label="t('nav.top')" class="relative min-h-dvh px-4"><div class="mx-auto max-w-2xl pt-[20vh]"><h1 class="text-4xl font-medium"><Typewriter :text="t('hero.greeting')"/></h1><p class="mt-2 text-lg leading-relaxed text-gray-300">{{ t('hero.role') }}</p></div><p aria-hidden="true" class="absolute right-8 bottom-8 hidden animate-nudge font-mono text-[11px] text-dim uppercase lg:block">{{ t('hero.scroll') }} ↓</p></section>
 <section id="projects" aria-labelledby="projects-title" class="relative min-h-dvh lg:grid lg:grid-cols-[var(--spacing-rail)_minmax(0,1fr)]">
  <div data-reveal="up"><h2 id="projects-title" class="px-12 pt-30 text-2xl font-bold tracking-wider uppercase lg:sr-only">{{ t('projects.title') }}</h2><ProjectList :active-id="selected" class="mt-[70px] lg:mt-0" @preview="selected = $event"/></div>
  <div class="relative hidden max-w-[664px] lg:block"><div aria-hidden="true" class="absolute top-[3%] h-[95%] w-px bg-line"></div><header class="ml-4 pt-6" aria-hidden="true"><p class="text-2xl font-bold tracking-wider uppercase">{{ t('projects.title') }}</p><p class="text-xs">{{ t('projects.count', { n: projects.length }) }}</p></header>
   <div class="mx-3 mt-24" data-reveal="up">
    <div v-for="project in projects" :key="project.id" :data-project-panel="project.id" :hidden="project.id !== selected" :class="{ 'animate-panel-in': project.id === selected }">
     <article class="flex flex-col gap-3"><h3 class="text-base font-bold">{{ project.title }}</h3><Carousel :project="project" :href="localize(`/projects/${project.id}/`)" class="max-w-[460px]"/><ProjectLinks :project="project"/><ul class="flex flex-wrap items-center gap-2 lg:max-w-[500px]"><li v-for="id in project.stack" :key="id"><TechBadge :id="id"/></li></ul><p class="max-w-[80%] text-sm font-medium whitespace-pre-line">{{ project.description[locale] }}</p><RouterLink :to="localize(`/projects/${project.id}/`)" class="mt-2 self-start font-mono text-[11px] uppercase underline-offset-4 transition-colors hover:text-hot-text hover:underline">{{ t('projects.viewFull') }} →</RouterLink></article>
    </div>
   </div>
  </div>
 </section>
 <ExperienceSection/><AboutSection/>
</main>
</template>
