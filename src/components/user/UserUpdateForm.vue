<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { User } from "../../type/User.ts";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store";
import MyImgInputT from "../core/MyImgInputT.vue";
import { useMessage } from "naive-ui";

const route = useRoute();
const message = useMessage();
const userStore = useUserStore();

const myImgInput = ref();
//@ts-ignore
const user = ref<User>({});
//@ts-ignore
const formData = ref<User>({});

async function submit() {
  const res = await userStore.update(formData.value);
  if (res.data.code === 100) {
    message.success("更新成功");
    userStore.state.user = res.data.data;
  } else if (res.data.code === 200) {
    message.warning("Token失效,请重新登录");
  }
}

onBeforeMount(async () => {
  const uid = route.params.uid as string;
  user.value = (await userStore.getUserByUid(uid, false)) as User;
  formData.value = JSON.parse(JSON.stringify(user.value!));
});
</script>

<template>
  <n-space style="margin: 60px" justify="center">
    <n-space vertical align="center"></n-space>
    <n-card style="min-width: 700px">
      <n-form :model="formData" ref="userForm">
        <n-form-item label="昵称" prop="nickname">
          <n-input v-model:value="formData.nickname" />
        </n-form-item>
        <n-form-item label="电子邮箱" prop="email">
          <n-input v-model:value="formData.email" />
        </n-form-item>
        <n-form-item label="头像">
          <my-img-input-t
            v-model:path="formData.avatar"
            ref="myImgInput"
            @success="message.success('修改成功')"
            :fixed-number="[1, 1]"
            :height="80"
            :width="80"
            round
            reply
          >
          </my-img-input-t>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="submit">提交</n-button>
        </n-form-item>
      </n-form>
    </n-card>
    {{ user }}
  </n-space>
</template>

<style scoped></style>
