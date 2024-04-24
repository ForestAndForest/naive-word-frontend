<template>
  <div>
    <MdEditor
        showCodeRowNumber
        preview-theme="vuepress"
        @onGetCatalog="setDirectory"
        @onUploadImg="onUploadImg"
        :theme="systemStore.state.systemSetting.theme"
        :style="{height: props.height}"
        v-model="content" pageFullScreen>
    </MdEditor>
  </div>

</template>


<script setup lang="ts">
import { ref} from "vue";

import {MdEditor} from "md-editor-v3";
import {useSystemStore} from "../../store";
import {uploadImage} from "../../api/system.ts";

const systemStore = useSystemStore()
const content = ref('')
const directory = ref([])

const props = defineProps<{ height?: string }>()

const onUploadImg = async (files: any, callback: any) => {
  const urls = []
  for (const file of files) {
    const formData = new FormData()
    formData.append("file", file)
    const res = await uploadImage(formData)
    urls.push(res.data)
  }
  callback(urls)
}


function setDirectory(arg: []) {
  directory.value = arg
}

function getContent() {
  return content.value
}

function getDirectory() {
  return directory.value
}

defineExpose({
  getContent,
  getDirectory
})

</script>


<style scoped>
.loading {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading-img {
  width: 100px;
  height: 100px;
}
</style>

