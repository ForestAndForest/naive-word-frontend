<script setup lang="ts">
defineProps<{ html: string }>()
</script>

<template>
  <div class="container-display" data-bs-theme='dark' v-html="html">
  </div>
</template>

<style scoped>
</style>
