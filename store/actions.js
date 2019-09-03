import {
  SET_JWT_TOKEN,
  SET_CONNECTED_USER,
  LOGOUT,
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
    const account = state.account;
    commit(SET_CONNECTED_USER, { account, pharmacist });
    this.app.$cookies.remove("userData");
    this.app.$cookies.set("userData", { account, pharmacist });
  },

  [LOGOUT]({ commit }) {
    this.app.$cookies.remove("accessToken");
    this.app.$cookies.remove("userData");
    commit(SET_JWT_TOKEN, null);
    commit(SET_CONNECTED_USER, null);
    this.$router.push({ path: "/" });

    commit(TOGGLE_SNACKBAR, "A bientôt");
  }
};
