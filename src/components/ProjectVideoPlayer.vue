<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import type { Project } from '../lib/content';
import { useLocale } from '../composables/useLocale';
import MediaFrame from './MediaFrame.vue';

const props = defineProps<{ video: Project['videos'][number]; active: boolean }>();
const emit = defineEmits<{ play: [] }>();
const { locale, t } = useLocale();
const captionId = useId();
const started = ref(false);
const failed = ref(false);
const player = ref<HTMLVideoElement>();
watch(() => props.active, active => { if (!active) player.value?.pause(); });

async function play() {
  failed.value = false;
  started.value = true;
  emit('play');
  await nextTick();
  player.value?.focus({ preventScroll: true });
  try { await player.value?.play(); } catch {
    // Native controls allow retrying when the browser requires another gesture.
  }
}
onBeforeUnmount(() => {
  if (!player.value) return;
  player.value.pause();
  player.value.removeAttribute('src');
  player.value.load();
});
</script>

<template>
  <figure>
    <MediaFrame>
      <div class="relative max-h-[70svh] w-full overflow-hidden bg-[#0b0b0b]" :style="{ aspectRatio: `${video.width} / ${video.height}` }">
        <button v-if="!started" type="button" class="group/play absolute inset-0 block size-full cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white" :aria-label="t('projects.playVideo', { title: video.title[locale] })" @click="play">
          <img :src="video.poster" alt="" :width="video.width" :height="video.height" loading="lazy" decoding="async" class="size-full object-contain"/>
          <span aria-hidden="true" class="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full border border-white/60 bg-black/75 text-white shadow-lg transition duration-200 group-hover/play:scale-110 group-hover/play:bg-hot group-hover/play:text-ink group-active/play:bg-hot-pressed group-active/play:text-white group-focus-visible/play:bg-hot group-focus-visible/play:text-ink motion-reduce:transition-none">
            <svg viewBox="0 0 24 24" fill="currentColor" class="ml-1 size-7"><path d="M7 4.5v15L20 12z"/></svg>
          </span>
        </button>
        <video v-else ref="player" :src="video.src" :poster="video.poster" :width="video.width" :height="video.height" controls preload="none" playsinline tabindex="0" :aria-label="video.title[locale]" :aria-describedby="captionId" class="absolute inset-0 size-full object-contain" @play="emit('play')" @error="failed = true"/>
      </div>
    </MediaFrame>
    <figcaption :id="captionId" class="mt-3 flex items-start justify-between gap-4 text-[13px] leading-relaxed text-dim"><span>{{ video.description[locale] }}</span><span class="shrink-0 font-mono text-[11px]">{{ video.duration }}</span></figcaption>
    <p v-if="failed" role="alert" class="mt-3 text-sm text-gray-300">{{ t('projects.videoError') }} <a :href="video.src" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">{{ t('projects.openVideo') }} ↗</a></p>
  </figure>
</template>
