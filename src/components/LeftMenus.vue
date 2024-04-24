<template>
  <n-menu
      style="user-select: none"
      :options="options"
      key-field="id"
      accordion
      :on-update:value="update"
  />

</template>

<script setup lang="ts">
import {MenuOption, NMenu} from 'naive-ui'
defineProps<{ options: MenuOption[] }>()

const emits = defineEmits(['clickCallback'])


function update(key: string, item: MenuOption) {
  emits('clickCallback', {key, item})
}

</script>
