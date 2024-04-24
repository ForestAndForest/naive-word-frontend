<script setup lang="ts">
import "vue-cropper/dist/index";
//@ts-ignore
import VueCropper from "vue-cropper/src/vue-cropper.vue";
import { ref } from "vue";

const emit = defineEmits(["pushImage"]);
defineProps<{ path: string; fixedNumber: number[] }>();

const showValue = ref(false);
const cropper = ref();
const cropperOption = {
  info: true,
  autoCrop: true,
  // autoCropWidth: 180,
  // autoCropHeight: 100,
  fixed: true,
  mode: "auto",
  centerBox: true,
};

function show() {
  showValue.value = true;
}

async function confirm() {
  if (cropper.value) {
    cropper.value.getCropBlob(async (res: Blob) => {
      const url = URL.createObjectURL(res);
      const file = new File([res], "avatar.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("file", file);
      // await uploadImage(formData);
      emit("pushImage", file, url);
      // props.uploadCallback(url)
      showValue.value = false;
    });
  }
}

defineExpose({
  show,
});
</script>

<template>
  <n-modal v-model:show="showValue" style="width: 1100px; height: 600px">
    <n-card
      @close="
        () => {
          showValue = false;
        }
      "
      closable
      size="huge"
    >
      <template #header> 裁剪图片 </template>
      <VueCropper
        ref="cropper"
        :img="path"
        :auto-crop="cropperOption.autoCrop"
        :fixed="cropperOption.fixed"
        :fixed-number="fixedNumber"
        :mode="cropperOption.mode"
        :center-box="cropperOption.centerBox"
      ></VueCropper>
      <template #footer>
        <n-space justify="center">
          <n-space>
            <n-button
              type="default"
              secondary
              @click="
                () => {
                  showValue = false;
                }
              "
            >
              取消
            </n-button>
            <n-button type="default" secondary @click="confirm">
              确定
            </n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
