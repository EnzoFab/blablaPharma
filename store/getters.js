export default {
  // todo return true if the connected user sent this message
  isCurrentUserMessage: state => authorId =>
    state.connectedUser && authorId === state.connectedUser.id,
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
