export default {
  // todo return true if the connected user sent this message
  isCurrentUserMessage: state => authorId =>
    authorId === state.connectedUser.userId,
  isLoggedIn: state => {
    return state.connectedUser != null;
  },
  connectedUser: state => state.connectedUser,
  userType: state => {
    if (!state.connectedUser) {
      return "anonymous";
    }

    return state.connectedUser.professionalId ? "Pharmacist" : "Patient";
  }
};
