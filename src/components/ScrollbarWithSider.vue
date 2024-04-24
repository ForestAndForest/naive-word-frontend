<script setup lang="ts">
defineProps<{ siderWidth?: number }>()


</script>

<template>
  <n-scrollbar style="max-height: calc(100vh - 60px)">
    <div style="display: flex; flex-wrap: nowrap;">
      <div style="flex: 1;">
        <slot name="default"></slot>
      </div>
      <div
          style="position: sticky; top: 0; max-height: calc(100vh - var(--head-height)); height: auto;width: max-content">
        <slot name="sider"></slot>
      </div>
    </div>
  </n-scrollbar>
</template>

<style scoped>

</style>
