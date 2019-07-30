import { SET_JWT_TOKEN, SET_CONNECTED_USER, LOGOUT } from "./types";
/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  async [SET_JWT_TOKEN]({ commit }, mail, password) {
    const data = await this.$auth.login(mail, password);
    // todo split data accessToken and user
    commit(SET_JWT_TOKEN, data.accessToken);
    commit(SET_CONNECTED_USER, data.user);
  },

  [LOGOUT]({ commit }) {
    commit(SET_JWT_TOKEN, null);
    commit(SET_CONNECTED_USER, null);
    this.$router.push({ path: "/" });
  }
};
