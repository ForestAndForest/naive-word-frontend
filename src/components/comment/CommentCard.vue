<script setup lang="ts">
import { Comment } from "../../type/Comment.ts";
import { computed, onBeforeMount, Ref, ref } from "vue";
import { useArticleStore, useUserStore } from "../../store";
import { User } from "../../type/User.ts";
import { useRouter } from "vue-router";
import { LikeOutlined, LikeFilled } from "@vicons/antd";
import { CommentEdit20Regular, Delete16Regular } from "@vicons/fluent";
import { UpToTop } from "@vicons/carbon";
import { betterFormatTimestamp } from "../../unit";
import { useMessage } from "naive-ui";
import { commentLike } from "../../api/note.ts";

const props = defineProps<{
  comment: Comment;
  authorUid: string;
}>();
const userStore = useUserStore();
const articleStore = useArticleStore();
const message = useMessage();
const router = useRouter();
const user: Ref<User | null> = ref(null);
const replyUser: Ref<User | null> = ref(null);
const isLike = computed(() =>
  articleStore.state.userArticleLikeCommentIds.has(props.comment.id),
);

function toUserInfo() {
  router.push({ path: "/user/" + user.value?.uid });
}

function switchLike() {
  if (!userStore.state.isLogin) {
    message.error("您还未登录,请先登录");
    return;
  }
  const id = props.comment.id;
  const userArticleLikeCommentIds =
    articleStore.state.userArticleLikeCommentIds;
  if (userArticleLikeCommentIds.has(id)) {
    userArticleLikeCommentIds.delete(id);
    props.comment.like -= 1;
    commentLike(
      props.comment.articleId,
      props.authorUid,
      props.comment.id,
      false,
    );
  } else {
    userArticleLikeCommentIds.add(id);
    props.comment.like += 1;
    commentLike(
      props.comment.articleId,
      props.authorUid,
      props.comment.id,
      true,
    );
  }
  console.log(articleStore.state.userArticleLikeCommentIds);
}

onBeforeMount(async () => {
  user.value = await userStore.getUserByUid(props.comment.userUid);
  if (props.comment.father) {
    replyUser.value = await userStore.getUserByUid(
      props.comment.father.userUid,
    );
  }
});
</script>

<template>
  <div style="padding: 10px 30px" class="card">
    <n-space>
      <n-space vertical justify="start">
        <n-avatar
          size="large"
          :src="user?.avatar"
          round
          style="cursor: pointer"
          @click="toUserInfo"
        ></n-avatar>
      </n-space>
      <n-space vertical>
        <n-space align="center">
          <n-text style="font-size: 14px; cursor: pointer" @click="toUserInfo">
            {{ user?.nickname }}
          </n-text>
          <n-tag type="info" size="small" v-if="authorUid === comment.userUid"
            >作者
          </n-tag>
          <n-tag
            type="success"
            size="small"
            v-if="userStore.state.user?.uid === comment.userUid"
            >我
          </n-tag>
        </n-space>

        <n-card v-if="comment.father" content-style="padding:10px" embedded>
          <n-space vertical>
            <n-space align="center">
              <n-text style="font-size: 16px"
                >{{ replyUser?.nickname }}
              </n-text>
              <n-tag
                type="info"
                size="small"
                v-if="authorUid === comment.father.userUid"
                >作者
              </n-tag>
              <n-tag
                type="success"
                size="small"
                v-if="userStore.state.user?.uid === comment.father.userUid"
                >我
              </n-tag>
            </n-space>
            <span>{{ comment.father.content }}</span>
          </n-space>
        </n-card>
        <n-text style="font-size: 17px">{{ comment.content }}</n-text>
        <!--        <span>时间,点赞,回复</span>-->
        <n-space
          align="center"
          style="gap: 5px; user-select: none; color: #707070"
        >
          <n-text style="font-size: 13px; color: #707070"
            >{{ betterFormatTimestamp(comment.time) }}
          </n-text>
          <n-divider vertical />
          <!--          点赞-->
          <n-space
            align="center"
            style="gap: 3px; cursor: pointer"
            class="like"
            @click="switchLike"
          >
            <n-icon
              :color="isLike ? '#3a5b9a' : ''"
              :size="16"
              style="margin-top: 3px"
            >
              <LikeOutlined v-if="!isLike" />
              <LikeFilled v-else />
            </n-icon>
            <span v-if="!isLike">
              {{ comment.like > 0 ? comment.like : "点赞" }}
            </span>
            <span v-else> {{ comment.like }}</span>
          </n-space>

          <n-divider vertical />

          <!--          回复-->
          <n-space
            align="center"
            style="gap: 3px; cursor: pointer"
            class="like"
          >
            <n-icon :size="16" style="margin-top: 3px">
              <CommentEdit20Regular />
            </n-icon>
            <span> 回复</span>
          </n-space>

          <n-divider
            vertical
            v-if="
              userStore.state.user?.uid === authorUid ||
              comment.userUid === userStore.state.user?.uid
            "
          />

          <!--          删除-->
          <n-space
            align="center"
            style="gap: 3px; cursor: pointer"
            class="like"
            v-if="
              userStore.state.user?.uid === authorUid ||
              comment.userUid === userStore.state.user?.uid
            "
          >
            <n-icon :size="16" style="margin-top: 3px">
              <Delete16Regular />
            </n-icon>
            <span> 删除</span>
          </n-space>

          <n-divider vertical v-if="userStore.state.user?.uid === authorUid" />

          <!--          置顶-->
          <n-space
            align="center"
            style="gap: 3px; cursor: pointer"
            class="like"
            v-if="userStore.state.user?.uid === authorUid"
          >
            <n-icon :size="16" style="margin-top: 3px">
              <UpToTop />
            </n-icon>
            <span> 置顶</span>
          </n-space>
        </n-space>
        <!--        <n-space> 回复 </n-space>-->
      </n-space>
    </n-space>
  </div>
  <n-divider />

  <!--  <div style="background-color: #00ae9e;width: 100%;height: 2px"></div>-->
</template>

<style scoped>
.like {
  transition: all 0.3s;
}

.like:hover,
.like.active {
  color: #0f8bc7;
}

.card.active {
  border: 2px solid rgb(8, 154, 33);
}
</style>
