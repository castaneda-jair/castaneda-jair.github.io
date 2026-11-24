<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import type { Project } from '../lib/content';
import { useLocale } from '../composables/useLocale';
import Icon from './Icon.vue';
const props = defineProps<{ project: Project; href: string }>();
const { locale, t } = useLocale();
const root = ref<HTMLElement>(), index = ref(0), paused = ref(false), visible = ref(false), drag = ref(0), dragging = ref(false);
let start = 0, timer: ReturnType<typeof setInterval> | undefined, observer: IntersectionObserver, abort: AbortController, motion: MediaQueryList;
const images = computed(() => props.project.gallery);
function go(next: number) { index.value = (next + images.value.length) % images.value.length; drag.value = 0; schedule(); }
function schedule() {
 clearInterval(timer);
 if (images.value.length > 1 && visible.value && !paused.value && !document.hidden && !motion?.matches) timer = setInterval(() => go(index.value + 1), 3000);
}
watch(paused, schedule);
onMounted(() => {
 abort = new AbortController(); motion = matchMedia('(prefers-reduced-motion: reduce)');
 observer = new IntersectionObserver(([entry]) => { visible.value = entry!.isIntersecting; schedule(); });
 if (root.value) observer.observe(root.value);
 document.addEventListener('visibilitychange', schedule, { signal: abort.signal });
 motion.addEventListener('change', schedule, { signal: abort.signal });
 window.addEventListener('pointermove', e => { if (dragging.value) drag.value = e.clientX - start; }, { signal: abort.signal });
 window.addEventListener('pointerup', () => { if (!dragging.value) return; dragging.value = false; const dx = drag.value; if (dx < -60) go(index.value + 1); else if (dx > 60) go(index.value - 1); else drag.value = 0; suppressClick = Math.abs(dx) > 5; paused.value = false; }, { signal: abort.signal });
 window.addEventListener('pointercancel', () => { dragging.value = false; drag.value = 0; paused.value = false; }, { signal: abort.signal });
});
let suppressClick = false;
function onPointerDown(e: PointerEvent) {
 if (e.button !== 0 || images.value.length < 2) return;
 start = e.clientX; dragging.value = true; drag.value = 0; suppressClick = false; paused.value = true;
}
function onClick(e: MouseEvent) {
 if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; }
}
onBeforeUnmount(() => { abort?.abort(); observer?.disconnect(); clearInterval(timer); });
</script>
<template>
<div ref="root" data-carousel role="region" :aria-label="t('carousel.label', { title: project.title })" class="relative aspect-video overflow-hidden" @pointerenter="paused = true" @pointerleave="paused = false" @focusin="paused = true" @focusout="paused = false" @keydown.left.prevent="go(index - 1)" @keydown.right.prevent="go(index + 1)">
 <div data-track class="flex h-full transition-transform duration-700 ease-spring will-change-transform" :style="{ transform: `translateX(calc(-${index * 100}% + ${drag * .6}px))`, transitionDuration: dragging ? '0ms' : undefined }" @pointerdown="onPointerDown" @click.capture="onClick">
  <RouterLink v-for="(image, i) in images" :key="image.src" :to="href" :tabindex="i === index ? undefined : -1" class="block w-full shrink-0" draggable="false"><img :src="image.src" :alt="image.caption?.[locale] ?? `${project.title} — ${i + 1}`" width="1440" height="900" :loading="i === 0 ? 'eager' : 'lazy'" class="pointer-events-none h-full w-full object-cover" draggable="false"/></RouterLink>
 </div>
 <template v-if="images.length > 1">
  <button type="button" data-prev :aria-label="t('carousel.prev')" class="absolute top-1/2 left-3 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white transition hover:scale-110 hover:bg-hot hover:text-ink active:bg-hot-pressed active:text-white active:scale-90" @click="go(index - 1)"><Icon name="chevron-left"/></button>
  <button type="button" data-next :aria-label="t('carousel.next')" class="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white transition hover:scale-110 hover:bg-hot hover:text-ink active:bg-hot-pressed active:text-white active:scale-90" @click="go(index + 1)"><Icon name="chevron-right"/></button>
  <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"><button v-for="(_, i) in images" :key="i" type="button" :data-dot="i" :aria-label="t('carousel.goTo', { n: i + 1 })" :aria-current="i === index ? 'true' : undefined" class="size-3 rounded-full bg-white/50 transition duration-200 hover:scale-125 hover:bg-hot active:bg-hot-pressed aria-[current]:scale-125 aria-[current]:bg-white" @click="go(i)"/></div>
 </template>
</div>
</template>
