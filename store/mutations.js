import {
  SET_JWT_TOKEN,
  SET_CONNECTED_USER,
  SET_REFRESH_TOKEN,
  TOGGLE_CONNECTION_DIALOG,
  TOGGLE_SNACKBAR,
  HIDE_SNACKBAR,
  SET_VISITOR_ID
} from "./types";

export default {
  /**
   *
   * @param {object} state
   * @param {string} token
   */
  [SET_JWT_TOKEN]: (state, token) => {
    state.token = token;
  },

  /**
   *
   * @param state
   * @param refreshToken
   */
  [SET_REFRESH_TOKEN]: (state, refreshToken) => {
    state.refreshToken = refreshToken;
  },

  /**
   *
   * @param {object} state
   * @param {object} userData
   */
  [SET_CONNECTED_USER]: (state, userData) => {
    const { account, pharmacist } = userData
      ? userData
      : { account: null, pharmacist: null };
    state.connectedUser = account;
    state.pharmacist = pharmacist;
  },

  /**
   * Show or hide the connection dialog
   *
   * @param {object} state
   * @param {boolean} active
   */
  [TOGGLE_CONNECTION_DIALOG]: (state, active = false) => {
    state.contactPharmacistDialog = active;
  },

  [TOGGLE_SNACKBAR]: (state, text) => {
    state.snackBarVisible = true;
    state.snackbarText = text;
  },

  [HIDE_SNACKBAR]: state => (state.snackBarVisible = false),

  [SET_VISITOR_ID]: (state, visitorId) => (state.visitorId = visitorId)
};
