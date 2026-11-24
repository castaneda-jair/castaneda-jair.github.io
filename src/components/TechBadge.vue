<script setup lang="ts">
import { computed } from 'vue';
import { stack, type TechId } from '../data/stack';
const props = defineProps<{ id: string; compact?: boolean }>();
const tech = computed(() => stack[props.id as TechId]);
</script>
<template>
<component :is="compact ? 'span' : 'a'" v-if="tech" :href="compact ? undefined : tech.url" :target="compact ? undefined : '_blank'" :rel="compact ? undefined : 'noopener noreferrer'" class="inline-flex items-center" :class="compact ? 'h-6 gap-1.5 rounded-[4px] bg-chip px-2 text-[11px] leading-none text-gray-200' : 'gap-2 rounded-md bg-surface px-3 py-1 text-sm text-white transition-colors hover:bg-surface-hover'">
<img v-if="'icon' in tech" :src="tech.icon" alt="" :width="compact ? 14 : 20" :height="compact ? 14 : 20" :class="compact ? 'size-3.5' : 'size-5'" loading="lazy" decoding="async" />{{ tech.name }}
</component>
</template>
