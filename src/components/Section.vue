<script setup lang="ts">
withDefaults(defineProps<{ id: string; title: string; meta?: string; reveal?: boolean; fit?: boolean }>(), { reveal: true, fit: false });
</script>
<template>
<section :id="id" :aria-labelledby="`${id}-title`" class="relative min-h-dvh lg:grid lg:grid-cols-[var(--spacing-rail)_minmax(0,1fr)]">
  <div aria-hidden="true"></div>
  <div class="relative flex min-h-dvh lg:border-l lg:border-line">
    <div class="w-full max-w-3xl px-4 pt-6 pb-24 lg:px-[10px] lg:pl-4" :class="{ 'lg:flex lg:min-h-dvh lg:flex-col lg:pb-[min(48px,5vh)]': fit }">
      <header><h2 :id="`${id}-title`" class="font-display text-2xl leading-none font-bold tracking-[-0.04em] uppercase">{{ title }}</h2><p v-if="meta" class="mt-3 font-mono text-[11px]">{{ meta }}</p></header>
      <div class="mt-24" :class="fit ? 'lg:mt-[min(120px,9vh)] lg:flex lg:min-h-0 lg:flex-1 lg:flex-col' : 'lg:mt-[170px]'" :data-reveal="reveal ? 'up' : undefined"><slot /></div>
    </div>
  </div>
</section>
</template>
