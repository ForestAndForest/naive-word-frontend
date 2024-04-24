<script setup lang="ts">
import { useUserStore } from "../../store";
import { ref, Ref } from "vue";
import { User } from "../../type/User.ts";

const userStore = useUserStore();

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
}

interface LoginForm {
  email: string;
  password: string;
}

const loginForm: Ref<LoginForm> = ref({
  email: "",
  password: "",
});

const signupForm: Ref<SignupForm> = ref({
  email: "",
  password: "",
  confirmPassword: "",
  captcha: "",
});

const loading = ref(false);

async function login() {
  loading.value = true;
  userStore.state.isShowForm = !(await userStore.login(
    loginForm.value as User,
  ));
  loading.value = false;
}

async function signup() {
  loading.value = true;
  const from = {
    email: signupForm.value.email,
    password: signupForm.value.password,
  };
  userStore.state.isShowForm = !(await userStore.signup(from as User));
  loading.value = false;
}

function close() {
  //@ts-ignore
  loginForm.value = {};
  //@ts-ignore
  signupForm.value = {};
  userStore.closeForm();
}
</script>

<template>
  <n-modal
    :show="userStore.state.isShowForm"
    :mask-closable="false"
    @mask-click="close"
  >
    <n-card size="huge" style="width: 600px" closable @close="close">
      <n-tabs
        default-value="signin"
        size="large"
        justify-content="space-evenly"
      >
        <n-tab-pane name="signin" tab="登录">
          <n-form :model="loginForm">
            <n-form-item-row label="邮箱地址:" required path="email">
              <n-input
                v-model:value="loginForm.email"
                placeholder="请输入邮箱地址"
              />
            </n-form-item-row>
            <n-form-item-row label="密码:" required path="password">
              <n-input
                v-model:value="loginForm.password"
                placeholder="请输入密码"
              />
            </n-form-item-row>
          </n-form>
          <n-button
            type="primary"
            block
            secondary
            strong
            @click="login"
            :loading="loading"
          >
            登录
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form :model="signupForm">
            <n-form-item-row label="邮箱地址:" required path="email">
              <n-input
                v-model:value="signupForm.email"
                placeholder="请输入邮箱地址"
              />
            </n-form-item-row>
            <n-form-item-row label="密码:" required path="password">
              <n-input
                v-model:value="signupForm.password"
                placeholder="请输入密码"
              />
            </n-form-item-row>
            <n-form-item-row label="重复密码:" required path="confirmPassword">
              <n-input
                v-model:value="signupForm.confirmPassword"
                placeholder="重复密码"
              />
            </n-form-item-row>
          </n-form>
          <n-button
            type="primary"
            block
            secondary
            strong
            @click="signup"
            :loading="loading"
          >
            注册
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
