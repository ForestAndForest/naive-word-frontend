<script setup lang="ts">
import { ExpandLessSharp, ExpandMoreSharp } from "@vicons/material";

import { ref } from "vue";

defineProps<{
  title: string;
  data: string[];
  showTitle?: boolean;
}>();

const toggle = ref(false);

function onToggle() {
  toggle.value = !toggle.value;
}
</script>

<template>
  <n-card class="directory-container shadow">
    <n-space align="center" justify="space-between">
      <p class="title" v-if="showTitle">{{ $t("directory_title") }}</p>
      <n-space
        align="center"
        style="gap: 0; cursor: pointer; user-select: none"
        @click="onToggle"
      >
        <n-button strong text class="toggle">
          <template #icon>
            <n-icon
              :size="24"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <component
                :is="!toggle ? ExpandLessSharp : ExpandMoreSharp"
              ></component>
            </n-icon>
          </template>
          {{ !toggle ? "折叠" : "展开" }}
        </n-button>
      </n-space>
    </n-space>

    <n-scrollbar style="max-height: 350px" trigger="none">
      <n-anchor
        v-show="!toggle"
        ignore-gap
        :trigger-top="24"
        :top="88"
        :bound="150"
        style="z-index: 1"
      >
        <n-anchor-link href="#title" :title="title"></n-anchor-link>
        <n-anchor-link
          v-for="item in data"
          :title="item"
          :href="`#${item}`"
        ></n-anchor-link>
        <n-anchor-link href="#comment" title="评论"></n-anchor-link>
      </n-anchor>
    </n-scrollbar>
  </n-card>
</template>

<style scoped>
.directory-container {
  width: 300px;
}

.directory-container .title {
  font-size: 27px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
}

.directory-container .title:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 150%;
  height: 2px;
  background-color: #00ae9e;
}

.directory-container .item {
  padding: 2px 0 2px 15px;
  font-size: 15px;
  margin-top: 5px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
}

.directory-container .item.active {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.16);
}

.directory-container .item:hover {
  color: #409eff;
}

@media screen and (max-width: 800px) {
  .directory-container {
    display: none;
    width: 0;
  }
}
</style>
