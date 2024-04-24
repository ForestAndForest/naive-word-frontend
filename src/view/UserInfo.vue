<script setup lang="ts">
import { useArticleStore, useUserStore } from "../store";
import { onBeforeMount, Ref, ref } from "vue";
import { User } from "../type/User.ts";
import { useRoute, useRouter } from "vue-router";
import { formatTimestamp } from "../unit";
import { Edit } from "@vicons/carbon";
import ArticleCard from "../components/article/ArticleCard.vue";
import EmptyResult from "../components/core/EmptyResult.vue";
import MyImgInputT from "../components/core/MyImgInputT.vue";
import { useMessage } from "naive-ui";

const userStore = useUserStore();
const articleStore = useArticleStore();
const message = useMessage();
const route = useRoute();
const router = useRouter();
//@ts-ignore
const user: Ref<User> = ref({
  avatar: "",
});

function toReply() {
  router.push({
    path: `/user/${user.value?.uid}/revise`,
  });
}

async function updateAvatar() {
  const res = await userStore.update(user.value);
  if (res.data.code === 100) {
    message.success("修改成功");
  } else {
    message.error("修改失败");
  }
}

onBeforeMount(async () => {
  const uid = route.params.uid as string;
  const userInfo = await userStore.getUserByUid(uid);
  if (userInfo !== null) {
    user.value = userInfo;
  } else {
    console.log("没有该用户");
  }
});
</script>

<template>
  <!--  用户资料展示容器-->
  <n-space style="width: max-content; margin: 20px auto">
    <!--    主要-->
    <n-space vertical style="width: 700px">
      <n-card class="shadow">
        <n-space>
          <!--          头像-->
          <my-img-input-t
            v-model:path="user.avatar"
            @success="updateAvatar"
            ref="myImgInput"
            :fixed-number="[1, 1]"
            :height="100"
            :width="100"
            round
            reply
          />
          <n-space vertical>
            <n-space align="center">
              <n-text strong style="font-size: 20px"
                >{{ user?.nickname }}
              </n-text>
              <n-button
                text
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                @click="toReply"
              >
                <template #icon>
                  <n-icon>
                    <Edit />
                  </n-icon>
                </template>
              </n-button>
            </n-space>
            <n-text>UID:{{ user?.uid }}</n-text>
            <n-space>
              <n-tag strong size="small" type="error">管理员</n-tag>
              <n-tag strong size="small" type="error">用户</n-tag>
            </n-space>
          </n-space>
        </n-space>
        <n-space justify="end">
          <n-button strong secondary size="small" type="info">设置</n-button>
        </n-space>
        <n-divider style="margin: 10px 0" />
      </n-card>

      <n-card class="shadow">
        <n-tabs type="line" animated>
          <n-tab-pane tab="动态" name="action">
            <EmptyResult button-text="发布动态" />
          </n-tab-pane>
          <n-tab-pane tab="文章" name="article">
            <n-space vertical>
              <article-card
                v-for="card in articleStore.state.hotArticleCardList"
                :key="card.id"
                :card="card"
              />
            </n-space>
          </n-tab-pane>
          <n-tab-pane tab="笔记" name="note">
            <EmptyResult button-text="添加笔记" />
          </n-tab-pane>
          <n-tab-pane tab="专栏" name="type">
            <EmptyResult button-text="增加专栏" />
          </n-tab-pane>
          <n-tab-pane tab="赞" name="like"> 1</n-tab-pane>
          <n-tab-pane tab="收藏" name=""> 1</n-tab-pane>
          <n-tab-pane tab="评论" name="comment"> 1</n-tab-pane>
        </n-tabs>
      </n-card>

      <!--      调试用-->
      <n-card class="shadow">
        <n-table :striped="true">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in user">
              <th>{{ key }}</th>
              <th>{{ value }}</th>
            </tr>
          </tbody>
        </n-table>
      </n-card>
    </n-space>
    <!--    次要-->
    <n-space vertical>
      <n-card style="width: 200px" class="shadow">
        <n-space justify="center">
          <n-space vertical align="center" style="gap: 0">
            <n-text strong style="font-size: 17px">关注</n-text>
            <n-text strong>0</n-text>
          </n-space>
          <n-divider vertical style="margin: 0 20px; height: 80%" />
          <n-space vertical align="center" style="gap: 0">
            <n-text strong style="font-size: 17px">粉丝</n-text>
            <n-text strong>10</n-text>
          </n-space>
        </n-space>
      </n-card>
      <n-space vertical style="padding: 10px">
        <n-divider style="margin: 0" />
        <n-space align="center" justify="space-between">
          <n-text>收藏集</n-text>
          <n-text strong>1</n-text>
        </n-space>
        <n-divider style="margin: 0" />
        <n-space align="center" justify="space-between">
          <n-text>关注标签</n-text>
          <n-text strong>1</n-text>
        </n-space>
        <n-divider style="margin: 0" />
        <n-space align="center" justify="space-between">
          <n-text>加入于</n-text>
          <n-text strong
            >{{ formatTimestamp(user?.createTime ?? 0, "yyyy-MM-dd") }}
          </n-text>
        </n-space>
        <n-divider style="margin: 0" />
      </n-space>
    </n-space>
  </n-space>
</template>

<style scoped lang="scss">
.avatar {
  cursor: pointer;
  position: relative;

  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    z-index: 9999;
    transition: all 0.3s;
  }

  :hover:after {
    content: "点击查看";
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0, 0.5);
  }
}
</style>
