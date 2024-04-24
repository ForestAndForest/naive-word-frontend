<template>
  <n-menu
      style="user-select: none"
      :options="state.menus"
      key-field="id"
      accordion
      :on-update:value="update"
  />

</template>

<script setup lang="ts">
import {MenuOption, NMenu} from 'naive-ui'

import {useDemoStore} from '../store'
import {useRouter} from "vue-router";


const state = useDemoStore().state
const router = useRouter()


function update(key: string, item: MenuOption) {
  const type = item.type
  if (type === 'group') return
  router.replace(`/${key}`)
}

</script>
