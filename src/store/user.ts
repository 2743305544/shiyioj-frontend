// initial state
import { StoreOptions } from "vuex";
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
      role: "notLogin",
    },
  }),
  getters,
  actions: {
    getLoginUser({ commit, state }, payload) {
      // TODO 远程登录
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      console.log(payload);
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
