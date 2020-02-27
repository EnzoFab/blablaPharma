import {
  SET_JWT_TOKEN,
  SET_REFRESH_TOKEN,
  SET_CONNECTED_USER,
  ADD_ACTIVE_CONVERSATIONS,
  TOGGLE_NOTIFICATION_SOUND
} from "../store/types";

export default ({ app, store }) => {
  const accessToken = app.$cookies.get("accessToken");
  const refreshToken = app.$cookies.get("refreshToken");
  const userData = app.$cookies.get("userData");
  const activeConversations = app.$cookies.get("activeConversations");
  const notificationActivated = app.$cookies.get("notificationActivated");

  if (accessToken && userData) {
    // if the value of the token isn't null
    store.commit(SET_JWT_TOKEN, accessToken);
    store.commit(SET_CONNECTED_USER, userData);
    store.commit(SET_REFRESH_TOKEN, refreshToken);
  }

  if (activeConversations && activeConversations.length > 0) {
    store.commit(`chat/${ADD_ACTIVE_CONVERSATIONS}`, activeConversations);
  }

  store.commit(`chat/${TOGGLE_NOTIFICATION_SOUND}`, notificationActivated);
};
