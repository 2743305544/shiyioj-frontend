// initial state
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";
//
// const state = () => ({
//   loginUser: {
//     username: "未登录",
//   },
// });

// getters
const getters = {};

// actions
// const actions = {
//   getLoginUser({ commit, state }, payload) {
//     commit("updateUser", { userName: "失意" });
//   },
// };
//
// // mutations
// const mutations = {
//   updateUser(state, payload) {
//     state.loginUser = payload;
//   },
// };

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  getters,
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      console.log(payload);
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
