export default ({ store, redirect }) => {
  if (!store.getters.isLoggedIn && !store.getters.isAdmin) {
    redirect("/");
  }
};
