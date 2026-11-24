<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
const props = withDefaults(defineProps<{ text: string; speed?: number; delay?: number }>(), { speed: 60, delay: 0 });
const output = ref(props.text);
let timer: ReturnType<typeof setTimeout>;
onMounted(() => {
 if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 output.value = ''; let i = 0;
 const tick = () => { output.value = props.text.slice(0, ++i); if (i < props.text.length) timer = setTimeout(tick, props.speed); };
 timer = setTimeout(tick, props.delay);
});
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template><span class="inline-block tracking-tight whitespace-pre-wrap"><span class="sr-only">{{ text }}</span><span aria-hidden="true">{{ output }}</span><span aria-hidden="true" class="ml-1 inline-block animate-blink">|</span></span></template>
