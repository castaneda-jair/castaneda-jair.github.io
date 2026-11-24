<script setup lang="ts">
import { useLocale } from '../composables/useLocale';
const { t, localize } = useLocale();
</script>
<template><main class="ml-[65px] grid min-h-dvh place-content-center px-6"><h1 class="font-display text-3xl">404 — {{ t('404.title') }}</h1><RouterLink :to="localize('/')" class="mt-6 rounded-full bg-surface px-5 py-2 text-sm transition-colors hover:bg-hot hover:text-ink active:bg-hot-pressed active:text-white">{{ t('404.back') }}</RouterLink></main></template>
