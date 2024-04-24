<script setup lang="ts">
import { NDynamicTags, NForm, NFormItem, NInput } from "naive-ui";
import { Note } from "../../type/Note.ts";
import { ref } from "vue";
import {
  ARTICLE_CATEGORY,
  ARTICLE_TYPE_OPTIONS,
  DEFAULT_ARTICLE_COVER,
  NO_COVER,
} from "../../constant";
import MyImgInputT from "../core/MyImgInputT.vue";

const coverType = ref("not");
const showModal = ref(false);
const myImgInput = ref();

const emit = defineEmits(["submit", "saveDraft"]);

const props = defineProps<{ note: Note; title: string; submitText: string }>();

function submit() {
  if (coverType.value === "custom") {
    emit("submit", props.note.cover);
  } else if (coverType.value === "default") {
    emit("submit", DEFAULT_ARTICLE_COVER);
  } else {
    emit("submit", NO_COVER);
  }
}

function cancel() {
  showModal.value = false;
}

function saveDraft() {
  emit("saveDraft");
}

function show() {
  showModal.value = true;
}

function close() {
  showModal.value = false;
}

function coverTypeChangeHandler(event: Event) {
  coverType.value = (event.target as HTMLInputElement).value;
}

defineExpose({
  show,
  close,
});
</script>

<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      closable
      @close="cancel"
    >
      <n-form :label-width="80" label-placement="left" label-align="right">
        <n-form-item
          label="文章类型"
          path="note.type"
          require-mark-placement="left"
          required
        >
          <n-radio-group v-model:value="note.type" name="radio group">
            <n-space>
              <n-radio
                v-for="type in ARTICLE_TYPE_OPTIONS"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item
          label="文章分类"
          path="note.category"
          require-mark-placement="left"
          required
        >
          <n-select
            v-model:value="note.category"
            placeholder="设置合适的分类,能方便检索"
            multiple
            :options="ARTICLE_CATEGORY"
            max-tag-count="responsive"
            size="small"
          />
        </n-form-item>
        <n-form-item path="note.tags" required require-mark-placement="left">
          <template #label>
            <n-popover trigger="hover">
              <template #trigger>
                <span>文章标签</span>
              </template>
              <n-space vertical>
                <n-space>最多5个标签</n-space>
                <n-space>设置合适的标签,能方便检索</n-space>
              </n-space>
            </n-popover>
          </template>
          <n-dynamic-tags v-model:value="note.tags" :max="5" />
        </n-form-item>

        <n-form-item>
          <template #label>
            <n-popover trigger="hover">
              <template #trigger>
                <span>添加封面</span>
              </template>
              <n-space vertical>
                <n-space>无封面</n-space>
                <n-space>默认封面:若未上传封面图,则显示第一个标签</n-space>
                <n-space>本地上传:支持上传JPG,PNG,BMP,WEBP 最大5MB</n-space>
              </n-space>
            </n-popover>
          </template>
          <n-space vertical align="center">
            <n-space align="center">
              <n-radio
                :checked="coverType === 'not'"
                value="not"
                name="无封面"
                @change="coverTypeChangeHandler"
              >
                无封面
              </n-radio>
              <n-radio
                :checked="coverType === 'default'"
                value="default"
                name="默认"
                @change="coverTypeChangeHandler"
              >
                默认
              </n-radio>
              <n-radio
                :checked="coverType === 'custom'"
                value="custom"
                name="自定义"
                @change="coverTypeChangeHandler"
              >
                自定义
              </n-radio>
            </n-space>

            <n-space v-show="coverType === 'custom'">
              <MyImgInputT
                ref="myImgInput"
                v-model:path="note.cover"
                :fixed-number="[18, 10]"
                :height="100"
                :width="180"
              >
              </MyImgInputT>
            </n-space>
          </n-space>
        </n-form-item>
        <n-form-item
          label="文章摘要"
          path="note.summary"
          require-mark-placement="left"
        >
          <n-input
            type="textarea"
            :resizable="false"
            v-model:value="note.summary"
            placeholder="会在推荐文章列表中显示,若为空则自动摄取文章前254个文字"
          />
        </n-form-item>

        <n-space justify="end">
          <n-button strong secondary @click="cancel">取消</n-button>
          <n-button strong secondary @click="saveDraft">保存为草稿</n-button>
          <n-button strong color="rgb(254,71,62)" @click="submit"
            ><span style="color: white">{{ submitText }}</span>
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </n-modal>
</template>

<style scoped>
.cover {
  width: 180px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #808080 dashed 1px;
  transition: all 0.3s;
}

.cover:hover {
  border: rgba(60, 194, 22, 0.72) dashed 1px;
  color: rgba(60, 194, 22, 0.72);
}
</style>
