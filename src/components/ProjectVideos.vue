<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../lib/content';
import { useLocale } from '../composables/useLocale';
import ProjectVideoPlayer from './ProjectVideoPlayer.vue';

defineProps<{ videos: Project['videos'] }>();
const { locale } = useLocale();
const activeSrc = ref('');
</script>

<template>
  <div class="flex flex-col gap-16">
    <section v-for="(video, index) in videos" :key="video.src" :aria-labelledby="`video-title-${index}`" data-video-story>
      <h2 :id="`video-title-${index}`" class="font-display text-xl leading-tight font-bold tracking-[-0.04em] uppercase">{{ video.title[locale] }}</h2>
      <div class="mt-5 flex max-w-[46em] flex-col gap-4 text-[13px] leading-[1.8] font-medium">
        <p v-for="paragraph in video.details[locale]" :key="paragraph">{{ paragraph }}</p>
      </div>
      <ProjectVideoPlayer :video="video" :active="activeSrc === video.src" class="mt-6" @play="activeSrc = video.src"/>
    </section>
  </div>
</template>
