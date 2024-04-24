<script setup lang="ts">

</script>

<template>
  <n-card
      class="shadow"
      :segmented="{
  content:true
    }"
  >
    <template #header>友情链接</template>
    <n-button secondary class="btn">Github</n-button>
    <n-button secondary class="btn">Github</n-button>
    <n-button secondary class="btn">Github</n-button>
    <n-button secondary class="btn">Github</n-button>
  </n-card>
</template>

<style scoped>
.btn {
  margin: 5px;
}
</style>
