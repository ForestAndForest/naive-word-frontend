<script setup lang="ts">
import { IconAuthor, IconEyes, IconHeart } from "../../icon";
import { computed, onBeforeMount, Ref, ref } from "vue";
import { ArticleCard } from "../../type/ArticleCard.ts";
import { DEFAULT_ARTICLE_COVER, NO_COVER } from "../../constant";
import { useUserStore } from "../../store";
import { User } from "../../type/User.ts";

const props = withDefaults(
  defineProps<{ loading?: boolean; card: ArticleCard }>(),
  {
    loading: true,
  },
);
const userStore = useUserStore();
const user: Ref<User | null> = ref(null);
const emits = defineEmits(["click"]);

const span = ref();
const fontSize = computed(() => {
  if (span.value) {
    return (
      (span.value.getBoundingClientRect().width + 50) /
      getLengthWithChinese(span.value.innerHTML)
    );
  }
  return 20;
});

function getLengthWithChinese(str: string) {
  const chineseRegex = /[\u4e00-\u9fa5]/g;
  const chineseChars = str.match(chineseRegex);
  const chineseLength = chineseChars ? chineseChars.length * 2 : 0;
  const otherLength =
    str.length - (chineseChars ? chineseChars.join("").length : 0);
  return chineseLength + otherLength;
}

onBeforeMount(async () => {
  user.value = await userStore.getUserByUid(props.card.authorUid);
});
</script>

<template>
  <n-card
    class="container"
    @click="emits('click')"
    hoverable
    embedded
    :segmented="{
      content: true,
    }"
  >
    <template #header-extra>
      <n-space>
        <span> 🪙100</span>
        <span>🔥{{ card.hot }}</span>
      </n-space>
    </template>
    <template #header>
      <span v-if="props.loading">
        <n-space align="center">
          <n-tag type="error"> 置顶 </n-tag>
          <n-tag type="success"> 官方 </n-tag>
          <n-tag type="warning">原创</n-tag>
          <n-tag type="default">搬运</n-tag>
          <n-tag type="default">翻译</n-tag>
          <span>{{ card.title }}</span>
        </n-space>
      </span>
      <n-skeleton v-else :height="50" :width="260" />
    </template>
    <n-space v-if="props.loading" align="center" size="large" :wrap="false">
      <div class="left" v-if="card.cover !== NO_COVER">
        <h1
          v-if="card.cover === DEFAULT_ARTICLE_COVER"
          ref="span"
          :style="{ fontSize: fontSize + 'px' }"
        >
          #测试
        </h1>
        <img v-else alt="cover" :src="card.cover" width="180" height="100" />
      </div>
      <n-space vertical>
        <div class="summary">
          <!--          我是摘要-->
          {{ card.summary }}
        </div>
        <n-space>
          <n-button :bordered="false" :focusable="false" text>
            <template #icon>
              <n-icon>
                <icon-heart />
              </n-icon>
            </template>
            {{ card.like }}赞
          </n-button>
          <n-button :bordered="false" :focusable="false" text>
            <template #icon>
              <n-icon>
                <icon-eyes />
              </n-icon>
            </template>
            {{ card.read }}阅读
          </n-button>
          <n-button :bordered="false" :focusable="false" text>
            <template #icon>
              <n-icon>
                <icon-author />
              </n-icon>
            </template>
            {{ user?.nickname }}著
          </n-button>
        </n-space>
      </n-space>
    </n-space>
    <n-space v-else align="center" size="large">
      <div class="left">
        <n-skeleton :loading="true" :height="100" :width="160" />
      </div>
      <n-space vertical>
        <div style="font-size: 2cap; font-weight: bold">
          <!--          我是标题-->
          <n-skeleton :height="20" :width="300" />
        </div>
        <div class="summary">
          <!--          我是摘要-->
          <n-skeleton :height="20" :width="600" />
        </div>
        <n-space :wrap="false">
          <n-skeleton :height="20" :width="600" />
        </n-space>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped>
.container {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
}

.left {
  background-image: url("../../assets/defaultCardBg.jpg");
  background-position-x: -100px;
  background-position-y: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343434;
  width: 180px;
  height: 100px;
}

.left img {
  max-width: 180px;
  max-height: 100px;
}

@media screen and (max-width: 500px) {
  .left {
    display: none;
  }
}
</style>
