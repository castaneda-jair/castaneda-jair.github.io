<script setup lang="ts">
import SideNav from './components/SideNav.vue';
</script>
<template><SideNav/><RouterView v-slot="{ Component, route }"><component :is="Component" :key="route.name === 'home' ? `home-${route.params.locale || 'es'}` : route.path"/></RouterView></template>
