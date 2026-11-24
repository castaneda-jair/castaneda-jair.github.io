<script setup lang="ts">
import type { Project } from '../lib/content';
import { useLocale } from '../composables/useLocale';
import Icon from './Icon.vue';
defineProps<{ project: Project; large?: boolean }>();
const { t } = useLocale();
</script>
<template>
<div class="flex items-center" :class="large ? 'flex-wrap gap-5' : 'gap-4'">
 <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 transition-colors duration-200" :class="large ? 'h-[35px] text-xs' : 'py-1.5 text-[11px] leading-none'"><span class="project-glow font-medium">{{ t('projects.demo') }}</span><span role="img" :aria-label="t(project.live ? 'projects.live' : 'projects.offline')" class="relative flex size-2"><span v-if="project.live" class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:hidden"></span><span class="relative inline-flex size-2 rounded-full" :class="project.live ? 'bg-green-400' : 'bg-red-400'"></span></span></a>
 <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer" :aria-label="t('projects.repo', { title: project.title }) + (project.repoVisibility === 'private' ? ' (Private)' : '')" class="inline-flex items-center gap-2 transition-colors duration-200" :class="large ? 'h-[35px] text-xs' : 'py-1.5'"><Icon name="github" :size="large ? 16 : 18"/><span v-if="project.repoVisibility === 'private'" class="project-glow repo-private text-[11px] font-medium normal-case">Private</span><span v-else-if="large">{{ t('projects.source') }}</span></a>
</div>
</template>

<style scoped>
.project-glow {
  color: #e3e2ff;
  text-shadow: 0 0 5px #c7c4ff80, 0 0 12px #aaa4ff55;
  transition: text-shadow 180ms ease, color 180ms ease;
}
a:hover .project-glow, a:focus-visible .project-glow {
  color: var(--color-hot-text);
  text-shadow: 0 0 6px #dedbff, 0 0 16px #b6afffaa;
}
a:active .project-glow { color: var(--color-hot-pressed); }
</style>
