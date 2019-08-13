export default {
  // todo return true if the connected user sent this message
  isCurrentUserMessage: state => author => author === state.connectedUser.name,
  isLoggedIn: state => {
    return state.connectedUser != null;
  },
  connectedUser: state => state.connectedUser,
  userType: state => {
    if (!state.connectedUser) {
      return "anonymous";
    }

    return state.connectedUser.type === "Pharmacist" ? "Pharmacist" : "Patient";
  }
};
