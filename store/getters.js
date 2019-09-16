export default {
  isCurrentUserMessage: state => authorId =>
    state.connectedUser && authorId === state.connectedUser.id,

  isLoggedIn: state => state.token != null,

  isAdmin: state => state.connectedUser && state.connectedUser.role === "admin",

  connectedUser: state => state.connectedUser || null,

  pharmacistData: state => state.pharmacist,

  userType: state => {
    if (!state.connectedUser) {
      return "anonymous";
    }

    return state.pharmacist ? "Pharmacist" : "Patient";
  }
};
