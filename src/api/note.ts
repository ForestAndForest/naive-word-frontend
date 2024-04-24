import request from "./request";
import { Note } from "../type/Note.ts";

export function getNoteById(id: number) {
  return request({
    url: "/note/getNoteById",
    method: "get",
    params: {
      id,
    },
  });
}

export function publishNote(data: Note) {
  return request({
    url: "/note/publish/2",
    method: "post",
    data,
  });
}

export function getHotNote(ids: number[], size: number) {
  return request({
    url: "/note/getHotNote",
    method: "POST",
    data: {
      num: size,
      ids: ids,
    },
  });
}

export function getCommentsByArticleId(
  articleId: number,
  page: number,
  size: number,
) {
  return request({
    url: "/note/getCommentsByArticleId",
    method: "get",
    params: {
      articleId,
      page,
      size,
    },
  });
}

export function hotIncrement(articleId: number) {
  return request({
    url: "/note/hotIncrement",
    method: "get",
    params: {
      articleId,
    },
  });
}

export function getArticleCommentIdsByArticleId(
  articleId: number,
  uid: string,
) {
  return request({
    url: "/note/getArticleCommentIdsByArticleId",
    method: "GET",
    params: {
      articleId,
      uid,
    },
  });
}

export function updateLikedCommentIds(
  articleId: number,
  uid: string,
  ids: number[],
) {
  return request({
    url: "/note/updateLikedCommentIds",
    method: "post",
    params: {
      articleId,
      uid,
    },
    data: ids,
  });
}

export function commentLike(
  articleId: number,
  uid: string,
  id: number,
  isAdd: boolean,
) {
  return request({
    url: "/note/like",
    method: "get",
    params: {
      articleId,
      uid,
      id,
      isAdd,
    },
  });
}
