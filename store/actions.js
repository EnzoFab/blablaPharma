import {
  LOGOUT,
  REMOVE_CONVERSATIONS_FROM_STORE,
  REMOVE_MESSAGES_FROM_STORE,
  SET_CONNECTED_USER,
  SET_JWT_TOKEN,
  TOGGLE_SNACKBAR
} from "./types";

const logUserIn = (app, commit, token, account) => {
  app.$cookies.setAll([
    { name: "accessToken", value: token },
    { name: "userData", value: account }
  ]);
  commit(SET_CONNECTED_USER, account);
  commit(SET_JWT_TOKEN, token);
};
/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  async login({ commit }, { email, password }) {
    const { account, token, pharmacist } = await this.$auth.login(
      email,
      password
    );
    logUserIn(this.app, commit, token, { account, pharmacist });
  },

  async resetPassword({ commit }, { resetPasswordToken, password }) {
    const { account, token, pharmacist } = await this.$auth.updatePassword(
      resetPasswordToken,
      password
    );
    logUserIn(this.app, commit, token, { account, pharmacist });
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
  }
};
