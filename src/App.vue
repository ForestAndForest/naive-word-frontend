<script setup lang="ts">
import HeadNav from "./components/HeadNav.vue";
import { darkTheme, NLayout, NLayoutHeader, NLayoutContent } from "naive-ui";
import { useSystemStore, useArticleStore, useUserStore } from "./store";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import LoginSignupForm from "./components/home/LoginSignupForm.vue";
import { NConfigProvider } from "naive-ui";
import { darkThemeOverrides, lightThemeOverrides } from "./constant";

const systemStore = useSystemStore();
const articleStore = useArticleStore();
const userStore = useUserStore();
const loadingBarTargetRef = ref();
const theme = computed(() =>
  systemStore.state.systemSetting.theme === "dark" ? darkTheme : undefined,
);

const themeOverrides = computed(() =>
  systemStore.state.systemSetting.theme === "dark"
    ? darkThemeOverrides
    : lightThemeOverrides,
);

onBeforeMount(() => {
  systemStore.init();
  articleStore.fetchHotNote();
});

onMounted(() => {
  userStore.init();
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="theme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-layout style="height: 100vh">
          <n-layout-header bordered>
            <HeadNav />
            <login-signup-form />
          </n-layout-header>
          <n-layout-content class="main-container">
            <router-view></router-view>
          </n-layout-content>
        </n-layout>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
.main-container {
  height: calc(100vh - 60px);
}
</style>
