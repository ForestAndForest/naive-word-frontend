<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import DirectoryView from "../../components/article/DirectoryView.vue";
import { NSpace, useLoadingBar } from "naive-ui";
import { useArticleStore, useSystemStore, useUserStore } from "../../store";
import { nextTick, onBeforeMount, onBeforeUnmount, Ref, ref } from "vue";
import { timestampToDateTime } from "../../unit";
import Comment from "../comment/Comment.vue";
import { User } from "../../type/User.ts";
import { useRouter } from "vue-router";
import { LikeOutlined } from "@vicons/antd";
import { CommentEdit20Regular, Collections24Regular } from "@vicons/fluent";

const props = withDefaults(defineProps<{ id: number }>(), {
  id: 0,
});

const systemStore = useSystemStore();
const articleStore = useArticleStore();
const userStore = useUserStore();
const loadingBar = useLoadingBar();
const router = useRouter();

const loading = ref(true);
const user: Ref<User | null> = ref(null);
const articleCommentPage = ref(0);

function toUserInfo() {
  router.push({ path: "/user/" + user.value?.uid });
}

onBeforeMount(async () => {
  loadingBar.start();
  try {
    await articleStore.fetchNoteById(props.id);
    await articleStore.fetchComment(articleCommentPage.value);
    user.value = await userStore.getUserByUid(
      <string>articleStore.state.currentArticle?.authorUid,
    );
    await nextTick(() => (loading.value = false));
  } finally {
    loadingBar.finish();
  }
});

window.addEventListener("beforeunload", () => {
  articleStore.updateLikedCommentIds();
});

onBeforeUnmount(() => {
  articleStore.updateLikedCommentIds();
});
</script>

<template>
  <!--  <n-layout has-sider>-->
  <!--    <n-layout-sider-->
  <!--        class="sider"-->
  <!--        collapse-mode="width"-->
  <!--        :collapsed-width="0"-->
  <!--        :width="siderWidth"-->
  <!--        show-trigger="bar"-->
  <!--        style="height: calc(100vh - 60px)"-->
  <!--        bordered-->
  <!--    >-->
  <!--      <DemoMenus/>-->
  <!--    </n-layout-sider>-->
  <!--    <n-layout-content>-->
  <n-scrollbar>
    <n-space
      style="max-width: max-content; margin: 0 auto; margin-top: 50px"
      :wrap="false"
    >
      <n-space vertical style="margin-right: 40px">
        <div class="container-main shadow">
          <n-card hoverable>
            <template #header>
              <div class="title" id="title">
                {{ articleStore.state?.currentArticle?.title }}
              </div>
            </template>
            <n-space>
              <span>作者:{{ user?.nickname }}</span>
              <span
                >已于{{
                  timestampToDateTime(
                    articleStore.state.currentArticle?.updateTime!,
                  )
                }}修改</span
              >
              <span>阅读量{{ articleStore.state.currentArticle?.read }}</span>
              <span
                >收藏{{ articleStore.state.currentArticle?.favorites }}</span
              >
              <span>点赞数{{ articleStore.state.currentArticle?.like }}</span>
            </n-space>
            <n-space align="center" style="margin-top: 5px">
              <n-space>分类专区:</n-space>
              <n-tag :bordered="false">md</n-tag>
              <n-tag :bordered="false">教程</n-tag>
              <n-space>文章标签:</n-space>
              <n-tag :bordered="false">前端</n-tag>
              <n-tag :bordered="false">后端</n-tag>
            </n-space>
          </n-card>
          <MdPreview
            :theme="systemStore.state.systemSetting.theme"
            showCodeRowNumber
            :model-value="
              articleStore.state.currentArticle?.content !== ''
                ? articleStore.state.currentArticle?.content
                : '空'
            "
            class="article-preview"
            preview-theme="cyanosis"
          />
        </div>
        <Comment :authorUid="user?.uid ?? ''" />
      </n-space>
      <n-space
        vertical
        style="position: fixed"
        item-style="margin-bottom: 10px"
      >
        <!--        用户资料卡-->
        <n-card class="shadow">
          <n-space vertical>
            <n-space align="center">
              <n-avatar
                :src="user?.avatar"
                round
                :size="60"
                style="cursor: pointer"
                @click="toUserInfo"
              />
              <n-text
                strong
                style="font-size: 22px; cursor: pointer"
                @click="toUserInfo"
                >{{ user?.nickname }}
              </n-text>
              <n-tag type="primary">官方</n-tag>
            </n-space>
            <n-space align="center" justify="space-around">
              <n-space vertical align="center" style="gap: 3px">
                <n-text strong style="font-size: 17px">10</n-text>
                <n-text style="color: #808080">文章</n-text>
              </n-space>
              <n-space vertical align="center" style="gap: 3px">
                <n-text strong style="font-size: 17px">1.9k</n-text>
                <n-text style="color: #808080">赞</n-text>
              </n-space>
              <n-space vertical align="center" style="gap: 3px">
                <n-text strong style="font-size: 17px">9999+</n-text>
                <n-text style="color: #808080">粉丝</n-text>
              </n-space>
            </n-space>
            <n-space align="center" justify="space-between">
              <n-button style="padding: 0 40px" type="info">关注</n-button>
              <n-button style="padding: 0 40px" type="info" ghost
                >私信
              </n-button>
            </n-space>
          </n-space>
        </n-card>
        <directory-view
          :title="articleStore.state.currentArticle?.title ?? ''"
          :data="articleStore.state.currentArticle?.directory ?? []"
          show-title
        />
      </n-space>
    </n-space>
  </n-scrollbar>

  <!--    </n-layout-content>-->
  <!--  </n-layout>-->

  <n-float-button
    position="fixed"
    style="left: 10vw; top: 70vh"
    type="primary"
    menu-trigger="hover"
  >
    <n-icon>
      <LikeOutlined />
    </n-icon>
    <template #menu>
      <n-float-button shape="circle" type="primary">
        <n-popover trigger="hover" placement="right">
          <template #trigger>
            <n-icon>
              <Collections24Regular />
            </n-icon>
          </template>
          <span>添加至收藏夹</span>
        </n-popover>
      </n-float-button>
      <n-float-button>
        <n-popover trigger="hover" placement="right">
          <template #trigger>
            <n-icon>
              <CommentEdit20Regular />
            </n-icon>
          </template>
          <span>评论</span>
        </n-popover>
      </n-float-button>
      <n-float-button>
        <n-popover trigger="hover" placement="right">
          <template #trigger>
            <n-icon>
              <LikeOutlined />
            </n-icon>
          </template>
          <span>点赞</span>
        </n-popover>
      </n-float-button>
    </template>
  </n-float-button>
</template>

<style scoped>
.title {
  font-size: 30px;
  font-weight: bold;
}

.container-main {
  max-width: 1200px;
  min-width: 1100px;
}

@media screen and (max-width: 400px) {
  .sider {
    display: none;
  }

  .article-preview {
    max-width: 350px;
  }
}
</style>
