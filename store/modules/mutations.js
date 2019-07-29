import { SET_JWT_TOKEN } from "./types";

export default {
  [SET_JWT_TOKEN]: (state, token) => {
    state.token = token;
  }
};
