import { SET_JWT_TOKEN, SET_CONNECTED_USER, LOGOUT } from "./types";
/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  async login({ commit }, { email, password }) {
    const { account, token } = await this.$auth.login(email, password);
    // todo split data accessToken and user
    this.app.$cookies.setAll([
      { name: "accessToken", value: token },
      { name: "userData", value: account }
    ]);
    commit(SET_CONNECTED_USER, account);
    commit(SET_JWT_TOKEN, token);
  },

  [LOGOUT]({ commit }) {
    this.app.$cookies.remove("accessToken");
    this.app.$cookies.remove("userData");
    commit(SET_JWT_TOKEN, null);
    commit(SET_CONNECTED_USER, null);
    this.$router.push({ path: "/" });
  }
};
