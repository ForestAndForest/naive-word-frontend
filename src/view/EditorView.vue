<script setup lang="ts">

import MyEditor from "../components/myEditor/MyEditor.vue";
import {computed, Ref, ref} from "vue";
import {Note} from "../type/Note.ts";
import ArticleForm from "../components/article/ArticleForm.vue";
import {useNoteStore} from "../store";
import {useMessage} from "naive-ui";


const message = useMessage()
const noteStore = useNoteStore()
const editor = ref()
const articleForm = ref()
const status = computed(()=>note.value.title)

const note: Ref<Note> = ref({
  id: 0,
  title: "无标题",
  summary: "",
  authorId: 0,
  content: "",
  cover: "",
  createTime: 0,
  updateTime: 0,
  tags: [],
  directory: [],
  type: 'original',
  like: 0,
  read: 0,
  favorites: 0,
  category: []
})

//发布文章
async function publish(cover: string) {
  if (!editor.value) {
    return
  }
  note.value.content = editor.value.getContent()
  note.value.directory = editor.value.getDirectory().map((item: { text: string, level: number }) => item.text)
  note.value.createTime = note.value.updateTime = Date.now();
  note.value.cover = cover
  const result = await noteStore.publish(note.value)
  message.create(result ? '发布成功' : '发布失败', {type: result ? 'success' : 'error'})
  close()
}


function show() {
  if (articleForm.value && status.value) {
    articleForm.value.show()
  }else {
    message.warning("请输入文章标题")
  }
}

function close() {
  if (articleForm.value) {
    articleForm.value.close()
  }
}

function saveDraft() {
  console.log(note.value)
}


</script>

<template>
  <ArticleForm
      ref="articleForm"
      :note="note"
      @submit="publish"
      @saveDraft="saveDraft"
      submitText="发布"
      title="发布文章"/>
  <n-card>
    <div style="display: flex;flex-wrap: nowrap">
      <div style="width:max-content">
        <h2>{{ $t('write_articles') }}</h2>
      </div>
      <div style="display: flex;flex-direction: row-reverse;width: calc(100vw - 169px)">
        <n-button class="btn" color="rgb(254,71,62)" type="success" @click="show"><span
            style="color: white">发布文章</span></n-button>
        <n-button class="btn" secondary @click="saveDraft">保存草稿</n-button>
        <n-input placeholder="请输入你的文章标题" v-model:value="note.title" :status="status ? 'success' : 'error'"/>
      </div>
    </div>
  </n-card>
  <my-editor
      ref="editor"
      height="calc(100vh - 136px)"
  />
</template>

<style scoped>
.btn {
  margin: 0 10px;
  font-weight: bold;
  font-family: Inter, system-ui
}
</style>
