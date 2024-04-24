<script setup lang="ts">
import { NGrid, NGridItem, NInput, NButton, NIcon } from "naive-ui";
import { IconFlodMenu } from "../icon";
import IconLogo from "../icon/IconLogo.vue";
import { useRouter } from "vue-router";
import { Component, computed, onBeforeUnmount, h } from "vue";
import { useSystemStore, useUserStore } from "../store";
import { useI18n } from "vue-i18n";
import {
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";

const { locale } = useI18n({ useScope: "global" });

const userStore = useUserStore();
const router = useRouter();
const systemStore = useSystemStore();
const theme = computed(() => systemStore.state.systemSetting.theme);
const MenuList = ["home", "demos", "notes", "editor"];
const options = [
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];

function ondrop(key: string) {
  switch (key) {
    case "logout": {
      userStore.logout();
      return;
    }
    case "profile": {
      router.push(`/user/` + userStore.state.user?.uid);
    }
  }
}

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
}

const switchLocale = () => {
  systemStore.updateState("systemSetting", {
    language: locale.value === "zh" ? "en" : "zh",
  });
  locale.value = systemStore.state.systemSetting.language;
};

const navigateTo = (item: string, index: number) => {
  systemStore.updateState("currentItem", index);
  router.push(item);
};

const switchTheme = () => {
  systemStore.updateState("systemSetting", {
    theme: systemStore.state.systemSetting.theme === "light" ? "dark" : "light",
  });
  systemStore.updateTheme();
};

onBeforeUnmount(() => {
  stop();
});
</script>

<template>
  <n-grid style="padding: 0 40px" cols="12" item-responsive>
    <n-grid-item span="1:2 800:3">
      <div class="logo-container">
        <div class="logo-img">
          <IconLogo />
        </div>
        <div class="logo-text">Naive Word</div>
      </div>
    </n-grid-item>
    <n-grid-item span="1:9 800:6">
      <div class="search-container">
        <router-link
          v-for="(item, index) in MenuList"
          @click="navigateTo('/' + item, index)"
          :to="'/' + item"
          class="nav-item"
          :class="{ active: $route.path.split('/')[1] === item }"
        >
          {{ $t(item) }}
        </router-link>
        <div class="search-item">
          <n-input
            type="text"
            :placeholder="$t('search')"
            size="small"
          ></n-input>
        </div>
      </div>
    </n-grid-item>
    <n-grid-item span="0 800:3">
      <div class="menus-container">
        <n-button
          class="menus-item"
          quaternary
          size="small"
          @click="switchTheme"
        >
          {{ theme !== "light" ? $t("lightMode") : $t("darkMode") }}
        </n-button>
        <n-button
          class="menus-item"
          quaternary
          size="small"
          @click="switchLocale"
        >
          {{ locale !== "zh" ? $t("chinese") : $t("english") }}
        </n-button>
        <n-dropdown
          :options="options"
          @select="ondrop"
          v-if="userStore.state.isLogin"
        >
          <n-button class="menus-item" quaternary size="small">
            <span>{{ userStore.state.user?.nickname }}</span>
          </n-button>
        </n-dropdown>
        <n-button
          v-else
          class="menus-item"
          quaternary
          size="small"
          @click="userStore.showForm"
          >点击登录</n-button
        >
        <div>v0.01</div>
      </div>
    </n-grid-item>
    <n-grid-item span="1:1 800:0">
      <div class="fold-menus-container">
        <IconFlodMenu :size="16" color="#808080" />
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style scoped>
.logo-container,
.fold-menus-container,
.menus-container,
.search-container {
  display: flex;
  align-items: center;
  height: 59px;
  padding: 0 10px;
}

.menus-container {
  justify-content: right;
}

.search-container {
  display: flex;
}

.search-container .nav-item {
  margin-right: 25px;
  color: var(--n-item-text-color-horizontal);
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;
}

.menus-container .menus-item {
  margin-right: 10px;
  border-radius: 3px;
}

.search-container .nav-item:hover,
.search-container .nav-item.active {
  color: rgba(99, 226, 183);
}

.logo-img {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
}

.logo-text {
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer;
  user-select: none;
}

@media screen and (max-width: 800px) {
  .logo-text {
    display: none;
  }

  .nav-item {
    display: none;
  }

  .search-item {
    flex: 1;
  }
}
</style>
