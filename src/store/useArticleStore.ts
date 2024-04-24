import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Note } from "../type/Note";
import {
  getHotNote,
  getNoteById,
  getCommentsByArticleId,
  getArticleCommentIdsByArticleId,
  updateLikedCommentIds as updateLikedCommentIdsApi,
} from "../api/note";
import { ArticleCard } from "../type/ArticleCard.ts";
import { Comment } from "../type/Comment.ts";
import { useUserStore } from "./index.ts";

interface State {
  currentArticle: Note | null;
  hotArticleCardList: ArticleCard[];
  hotArticleIdCache: number[];
  articleCommentList: Comment[];
  userArticleLikeCommentIds: Set<number>;
  commentNum: number;
}

export default defineStore("article", () => {
  const FETCH_HOT_ARTICLE_NUM = 10;
  const FETCH_COMMENT_NUM = 10;

  const userStore = useUserStore();

  const state: Ref<State> = ref({
    currentArticle: null,
    hotArticleCardList: [],
    hotArticleIdCache: [],
    articleCommentList: [],
    userArticleLikeCommentIds: new Set<number>(),
    commentNum: 0,
  });

  async function updateLikedCommentIds() {
    if (!userStore.state.user?.uid) {
      return;
    }
    await updateLikedCommentIdsApi(
      state.value.currentArticle?.id!,
      userStore.state.user?.uid,
      Array.from(state.value.userArticleLikeCommentIds),
    );
  }

  // 从后端获取文章通过id
  async function fetchNoteById(id: number) {
    state.value.currentArticle = (await getNoteById(id)).data.data;
  }

  async function fetchHotNote() {
    const cards = (
      await getHotNote(state.value.hotArticleIdCache, FETCH_HOT_ARTICLE_NUM)
    ).data.data;
    state.value.hotArticleCardList.push(...cards);
    state.value.hotArticleIdCache.push(
      ...cards.map((card: ArticleCard) => card.id),
    );
  }

  async function fetchComment(articleCommentPage: number) {
    const comments = (
      await getCommentsByArticleId(
        state.value.currentArticle?.id!,
        articleCommentPage,
        FETCH_COMMENT_NUM,
      )
    ).data.data;

    const { userArticleLikeCommentIds, articleCommentIds } = (
      await getArticleCommentIdsByArticleId(
        state.value.currentArticle?.id!,
        userStore.state.user?.uid ?? "-1",
      )
    ).data.data;
    state.value.userArticleLikeCommentIds = new Set(userArticleLikeCommentIds);
    state.value.commentNum = articleCommentIds.length;

    state.value.articleCommentList =
      comments.length > 0 ? _createComment(comments) : [];

    function _createComment(data: Comment[]) {
      const clone = JSON.parse(JSON.stringify(data)) as Comment[];
      data.forEach((item) => {
        if (item.fatherId) {
          item["father"] = clone.find((item1) => item1.id === item.fatherId)!;
        }
        //@ts-ignore
        delete item.fatherId;
      });
      return data;
    }
  }

  return {
    state,
    fetchNoteById,
    fetchHotNote,
    fetchComment,
    updateLikedCommentIds,
  };
});
