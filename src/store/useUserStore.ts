import { defineStore } from "pinia";
import { User } from "../type/User.ts";
import { Ref, ref } from "vue";
import {
  isLogin as isLoginApi,
  login as loginApi,
  getUserInfoByUid as getUserInfoByUidApi,
  signup as signupApi,
  logout as logoutApi,
  getUpdateUsers as getUpdateUsersApi,
  update as updateApi,
} from "../api/user.ts";
import { message } from "../unit";

interface State {
  cacheUsers: User[];
  user: User | null;
  isLogin: boolean;
  isShowForm: boolean;
  token: string;
}

export default defineStore(
  "user",
  () => {
    const state: Ref<State> = ref({
      cacheUsers: [],
      user: null,
      isLogin: false,
      isShowForm: false,
      token: "",
    });

    function clean() {
      state.value.isLogin = false;
      state.value.user = null;
      state.value.token = "";
    }

    async function init() {
      //将id和更新时间组成字符串形成列表
      // const useIdAndUpdateTime = state.value.cacheUsers.map(user => user.id + "|" + user.updateTime)
      //将列表发送后端与redis中的缓存(过期时间:3天)进行对比
      //若不同则返回更新后的用户信息,若redis查询为null也返回更新后的用户信息,若相同则返回null
      await batchUpdateCacheUserInfo();
      state.value.isLogin = (
        await isLoginApi(state.value.user?.uid ?? "-1")
      ).data.data;
      if (!state.value.isLogin) {
        clean();
      }
      message.info(state.value.isLogin ? "已登录" : "未登录");
    }

    async function update(user: User) {
      return await updateApi(user);
    }

    async function getUserByUid(
      uid: string,
      isCache: boolean = true,
    ): Promise<User | null> {
      //若用户信息已缓存则直接返回
      const user = state.value.cacheUsers.find((user) => user.uid === uid);
      if (user && isCache) {
        return user;
      }
      //若用户信息未缓存则发送请求获取用户信息
      const res = await getUserInfoByUidApi(uid);
      if (res.data.code === 100) {
        const newUser: User = res.data.data as User;
        const index = state.value.cacheUsers.findIndex(
          (item) => item.uid === newUser.uid,
        );
        if (index !== -1) {
          state.value.cacheUsers[index] = newUser;
        } else {
          state.value.cacheUsers.push(newUser);
        }
        return res.data.data;
      }
      return null;
    }

    async function batchUpdateCacheUserInfo() {
      const uidAndTime = state.value.cacheUsers.map((user) => {
        return { uid: user.uid, time: user.updateTime };
      });
      const users = (await getUpdateUsersApi(uidAndTime)).data.data as
        | []
        | User[];
      users.forEach((user) => {
        const index = state.value.cacheUsers.findIndex(
          (item) => item.uid === user.uid,
        );
        if (index !== -1) {
          state.value.cacheUsers[index] = user;
        }
      });
    }

    async function login(user: User) {
      const res = (await loginApi(user)).data;
      if (res.code !== 100) {
        message.error(res.msg);
        return false;
      }
      message.success("登录成功,欢迎回来[" + res.data.user.nickname + "]");
      state.value.user = res.data.user;
      state.value.token = res.data.token;
      state.value.isLogin = true;
      location.reload();
      return true;
    }

    async function signup(user: User) {
      const res = (await signupApi(user)).data;
      if (res.code !== 100) {
        message.error(res.msg);
        return false;
      }
      message.success("注册成功,欢迎[" + res.data.nickname + "]");
      state.value.user = res.data.user;
      state.value.token = res.data.token;
      state.value.isLogin = true;
      location.reload();
      return true;
    }

    async function logout() {
      if ((await logoutApi()).data.data) {
        message.info("登出成功");
        clean();
        location.reload();
      } else {
        message.error("登出失败,请查看控制台!");
      }
    }

    function checkLogin() {
      if (state.value.isLogin) {
        return;
      }
      showForm();
    }

    function showForm() {
      state.value.isShowForm = true;
    }

    function closeForm() {
      state.value.isShowForm = false;
    }

    return {
      state,
      init,
      login,
      signup,
      showForm,
      closeForm,
      logout,
      getUserByUid,
      checkLogin,
      update,
    };
  },
  {
    persist: true,
  },
);
