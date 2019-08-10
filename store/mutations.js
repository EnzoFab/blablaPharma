import {
  SET_JWT_TOKEN,
  SET_CONNECTED_USER,
  SET_CONNEXION_DIALOG
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
   * @param {object} state
   * @param {object} user
   */
  [SET_CONNECTED_USER]: (state, user) => {
    state.connectedUser = user;
  },

  /**
   * Show or hide the connection dialog
   *
   * @param {object} state
   * @param {boolean} active
   */
  [SET_CONNEXION_DIALOG]: (state, active = false) => {
    state.contactPharmacistDialog = active;
  }
};
