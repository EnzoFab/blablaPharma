import { SET_JWT_TOKEN, SET_CONNECTED_USER } from "../store/types";

export default ({ app, store }) => {
  const accessToken = app.$cookies.get("accessToken");
  const userData = app.$cookies.get("userData");

  if (accessToken && userData) {
    // if the value of the token isn't null
    store.commit(SET_JWT_TOKEN, accessToken);
    store.commit(SET_CONNECTED_USER, userData);
  }
};
