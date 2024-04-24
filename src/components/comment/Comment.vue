<script setup lang="ts">
import CommentCard from "./CommentCard.vue";
import { NSpace } from "naive-ui";
import { IconComment } from "../../icon";
import { useArticleStore } from "../../store";
import { CommentAdd28Regular } from "@vicons/fluent";
import { ref } from "vue";

defineProps<{ authorUid: string }>();

const articleStore = useArticleStore();
const page = ref(1);
function updatePage(page: number) {
  articleStore.fetchComment(page - 1);
}
</script>

<template>
  <n-card
    style="margin: 20px auto 50px; max-width: 1200px"
    content-style="padding:0"
    class="shadow"
  >
    <template #header>
      <n-space id="comment" align="center" justify="space-between">
        <n-space align="center">
          <icon-comment
            :size="25"
            style="display: flex; justify-content: center; align-items: center"
          />
          <h3>
            <n-text type="info" italic style="margin-right: 5px"
              >{{ articleStore.state.commentNum }}
            </n-text>
            条评论:
          </h3>
        </n-space>
        <n-button text bordered>
          <template #icon>
            <n-icon>
              <CommentAdd28Regular />
            </n-icon>
          </template>
          评论
        </n-button>
      </n-space>
      <n-space vertical>
        <n-divider style="margin: 0" />
      </n-space>
    </template>

    <template #default>
      <n-space
        vertical
        style="gap: 0; margin-bottom: 30px"
        align="center"
        item-style="width:100%"
      >
        <comment-card
          v-for="comment in articleStore.state.articleCommentList"
          :comment="comment"
          :author-uid="authorUid"
        />
        <n-space justify="center" align="center">
          <n-pagination
            v-model:page="page"
            v-if="articleStore.state.commentNum > 0"
            @update-page="updatePage"
            :page-count="Math.ceil(articleStore.state.commentNum / 10)"
          />
          <n-result v-else description="这里还空无一人，快来坐下，畅所欲言吧！">
            <template #icon>
              <img src="/noComment.png" alt="empty" style="margin: 20px" />
            </template>
            <template #footer>
              <n-button type="info" ghost>发布评论</n-button>
            </template>
          </n-result>
        </n-space>
      </n-space>
    </template>
  </n-card>
</template>

<style scoped></style>
