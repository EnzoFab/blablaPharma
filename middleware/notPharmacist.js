export default ({ store, redirect }) => {
  if (
    store.getters.isLoggedIn &&
    store.getters.connectedUser.role === "pharmacist"
  ) {
    redirect("/");
  }
};
