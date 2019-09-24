import {
  SET_JWT_TOKEN,
  SET_CONNECTED_USER,
  ADD_ACTIVE_CONVERSATIONS
} from "../store/types";

export default ({ app, store }) => {
  const accessToken = app.$cookies.get("accessToken");
  const userData = app.$cookies.get("userData");
  const activeConversations = app.$cookies.get("activeConversations");

  if (accessToken && userData) {
    // if the value of the token isn't null
    store.commit(SET_JWT_TOKEN, accessToken);
    store.commit(SET_CONNECTED_USER, userData);
  }

  if (activeConversations && activeConversations.length > 0) {
    store.commit(`chat/${ADD_ACTIVE_CONVERSATIONS}`, activeConversations);
  }
};
