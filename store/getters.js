export default {
  // todo return true if the connected user sent this message
  isCurrentUserMessage: state => author => author === "enzo",
  isLoggedIn: state => {
    return state.connectedUser != null;
  },
  connectedUser: state => state.connectedUser
};
