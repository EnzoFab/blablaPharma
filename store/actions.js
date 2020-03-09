import uuidv4 from "uuid/v4";
import to from "await-to-js";

import {
  LOGOUT,
  REMOVE_CONVERSATIONS_FROM_STORE,
  REMOVE_MESSAGES_FROM_STORE,
  SET_CONNECTED_USER,
  SET_JWT_TOKEN,
  SET_REFRESH_TOKEN,
  SET_VISITOR_ID,
  TOGGLE_SNACKBAR
} from "./types";

const logUserIn = (app, commit, token, account, refreshToken) => {
  app.$cookies.setAll([
    { name: "accessToken", value: token },
    { name: "userData", value: account },
    { name: "refreshToken", value: refreshToken }
  ]);
  commit(SET_CONNECTED_USER, account);
  commit(SET_JWT_TOKEN, token);
  commit(SET_REFRESH_TOKEN, refreshToken);
};
/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  async login({ commit }, { email, password }) {
    const { account, token, pharmacist, refreshToken } = await this.$auth.login(
      email,
      password
    );
    logUserIn(this.app, commit, token, { account, pharmacist }, refreshToken);
  },

  async resetPassword({ commit }, { resetPasswordToken, password }) {
    const {
      account,
      token,
      pharmacist,
      refresh_token
    } = await this.$auth.updatePassword(resetPasswordToken, password);
    logUserIn(this.app, commit, token, { account, pharmacist }, refresh_token);
    this.$router.push({ path: "/" });
  },

  /**
   * Update the account
   * @param {object}commit
   * @param {object} state
   * @param {object }account
   */
  updateAccount({ commit, state }, account) {
    const pharmacist = state.pharmacist;
    commit(SET_CONNECTED_USER, { account, pharmacist });
    this.app.$cookies.remove("userData");
    this.app.$cookies.set("userData", { account, pharmacist });
  },

  updatePharmacist({ commit, state }, pharmacist) {
    const account = state.connectedUser;
    commit(SET_CONNECTED_USER, { account, pharmacist });
    this.app.$cookies.remove("userData");
    this.app.$cookies.set("userData", { account, pharmacist });
  },

  [LOGOUT]({ commit }, payload) {
    this.app.$cookies.remove("accessToken");
    this.app.$cookies.remove("userData");
    this.app.$cookies.remove("activeConversations");

    commit(SET_JWT_TOKEN, null);
    commit(SET_REFRESH_TOKEN, null);
    commit(SET_CONNECTED_USER, null);
    commit(`chat/${REMOVE_MESSAGES_FROM_STORE}`);
    commit(`chat/${REMOVE_CONVERSATIONS_FROM_STORE}`);

    const { withRedirect = true, message = "À bientôt" } = payload
      ? payload
      : { width: true, message: "A bientôt" };

    if (withRedirect) {
      this.$router.push({ path: "/" });
    }

    if (message) {
      commit(TOGGLE_SNACKBAR, message);
    }
  },

  async refreshToken({ commit, state }) {
    console.log("Here");
    const [e, r] = await to(this.app.$auth.refreshToken(state.refreshToken));
    if (e) {
      throw e;
    }

    const { token, refreshToken } = r;

    if (token) {
      commit(SET_JWT_TOKEN, token);
      this.app.$cookies.set("accessToken", token);
    }

    if (refreshToken && refreshToken.length > 0) {
      commit(SET_REFRESH_TOKEN, refreshToken);
      this.app.$cookies.set("refreshToken", refreshToken);
    }
  },

  async generateVisitorId({ commit, getters }) {
    if (getters.isLoggedIn) {
      return getters.connectedUser.id;
    }

    const visitorId = uuidv4();

    commit(SET_VISITOR_ID, visitorId);
    this.app.$cookies.set("visitorId", visitorId);

    return visitorId;
  }
};
