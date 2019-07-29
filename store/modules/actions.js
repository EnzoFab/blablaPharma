import { SET_JWT_TOKEN } from "./types";
/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  async [SET_JWT_TOKEN]({ commit }, mail, password) {
    const token = await this.$auth.login(mail, password);
    commit(SET_JWT_TOKEN, token);
  }
};
