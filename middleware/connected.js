export default ({ store, redirect }) => {
  if (!store.getters.isLoggedIn) {
    redirect("/");
  }
};
