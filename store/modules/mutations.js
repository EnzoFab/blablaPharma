import { SET_JWT_TOKEN, SET_CONNECTED_USER } from "./types";

export default {
  [SET_JWT_TOKEN]: (state, token) => {
    state.token = token;
  },

  [SET_CONNECTED_USER]: (state, user) => {
    state.connectedUser = user;
  }
};
