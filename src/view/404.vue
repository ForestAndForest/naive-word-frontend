<script setup lang="ts">

</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center;height: 100%">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="$router.push('/home')">返回主页</n-button>
      </template>
    </n-result>
  </div>

</template>

<style scoped>

</style>
