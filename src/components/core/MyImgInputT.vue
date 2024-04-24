<script setup lang="ts">
import { UploadFileInfo } from "naive-ui";

import { computed, ComputedRef, ref } from "vue";
import MyCropper from "../core/MyCropper.vue";
import { uploadImage } from "../../api/system.ts";

const cropperRef = ref();

const cropperImagePath = ref("");
const upload = ref();
const fileInput = ref();

const emit = defineEmits(["update:path", "success"]);
const props = defineProps<{
  fixedNumber: number[];
  height: number;
  width: number;
  reply?: boolean;
  path?: string;
  round?: boolean;
}>();

const fileList: ComputedRef<UploadFileInfo[]> = computed(() => {
  return props.path !== ""
    ? [
        {
          id: new Date().getTime() + "",
          name: "",
          status: "pending",
          thumbnailUrl: props.path,
          file: null,
        },
      ]
    : [];
});

function remove() {
  emit("update:path", "");
}

function replyImg() {
  openFilePicker();
}

function openFilePicker() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileSelect(event: any) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function () {
      cropperImagePath.value = reader.result as string;
      showCropper();
    };
    reader.readAsDataURL(selectedFile);
    event.target.value = null;
  }
}

function showCropper() {
  if (cropperRef.value) {
    cropperRef.value.show();
  }
}

async function pushImage(img: File, _: string) {
  const formData = new FormData();
  formData.append("file", img);
  const imgPath = (await uploadImage(formData)).data;
  emit("update:path", imgPath);
  emit("success");
}
</script>

<template>
  <input
    type="file"
    ref="fileInput"
    style="display: none"
    @change="handleFileSelect"
  />
  <!-- 隐藏文件选择框 -->
  <my-cropper
    @pushImage="pushImage"
    :path="cropperImagePath"
    :fixed-number="fixedNumber"
    ref="cropperRef"
  />

  <n-upload
    ref="upload"
    style="display: none"
    :default-upload="false"
    :file-list="fileList"
    :max="1"
  >
  </n-upload>
  <div>
    <!--    删除-->
    <div
      v-if="fileList.length > 0"
      class="display"
      :style="{
        height: height + 'px',
        width: width + 'px',
        borderRadius: round ? '50%' : '0%',
      }"
      @click="reply ? replyImg() : remove()"
      :data-text="reply ? '点击修改' : '点击删除'"
    >
      <img
        style="width: 100%; height: 100%; border-radius: inherit"
        v-if="fileList.length > 0 && fileList[0].thumbnailUrl"
        :src="fileList[0].thumbnailUrl"
        alt=""
      />
    </div>

    <!--    选择-->
    <div
      @click="openFilePicker"
      :style="{
        height: height + 'px',
        width: width + 'px',
        borderRadius: round ? '50%' : '0%',
      }"
      class="trigger"
      style="cursor: pointer; user-select: none"
      v-if="fileList.length === 0"
    >
      <n-text strong style="font-size: 12px">点击上传</n-text>
    </div>
  </div>
</template>

<style scoped>
.trigger {
  height: 230px;
}

.display {
  position: relative;
  border-radius: 50px;
}

.display:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: inherit;
  background-color: transparent;
}

.display:hover:before {
  content: attr(data-text);
  background-color: rgba(89, 89, 89, 0.5);
}

.trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  border: #808080 dashed 1px;
  transition: all 0.3s;
}

.trigger:hover {
  border: rgba(60, 194, 22, 0.72) dashed 1px;
  color: rgba(60, 194, 22, 0.72);
}
</style>
