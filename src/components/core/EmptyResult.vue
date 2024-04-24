<script setup lang="ts">
defineEmits(["click"]);
defineProps<{ buttonText: string; text?: string }>();
</script>

<template>
  <n-result
    :description="text ?? '这里一片寂静，空灵的存在填满了周围。'"
    size="huge"
  >
    <template #icon>
      <img src="/empty.png" />
    </template>
    <template #footer>
      <n-button strong @click="$emit('click')"> {{ buttonText }}</n-button>
    </template>
  </n-result>
</template>

<style scoped></style>
