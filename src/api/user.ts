import request from "./request";
import { User } from "../type/User";

export function login(user: User) {
  return request({
    url: "/user/login",
    method: "POST",
    data: user,
  });
}

export function signup(user: User) {
  return request({
    url: "/user/signup",
    method: "POST",
    data: user,
  });
}

export function isLogin(uid: string) {
  return request({
    url: "/user/isLogin",
    method: "GET",
    params: {
      uid,
    },
  });
}

export function getUserInfoByUid(uid: string) {
  return request({
    url: "/user/getUserByUid",
    method: "GET",
    params: {
      uid,
    },
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "GET",
  });
}

export function update(user: User) {
  return request({
    url: "/user/updateUser",
    method: "POST",
    data: user,
  });
}

/**
 * 批量更新本地已缓存且更新了信息的用户
 * @param uidAndUpdateTime 本地已缓存用户的uid和updateTime组成的对象列表
 */
export function getUpdateUsers(
  uidAndUpdateTime: { uid: string; time: number }[],
) {
  return request({
    url: "/user/getUpdateUsers",
    method: "POST",
    data: uidAndUpdateTime,
  });
}
