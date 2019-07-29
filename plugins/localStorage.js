import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: "blablaPharma",
      paths: ["token", "userLoggedIn", "loggedUser"]
    })(store);
  });
};
