export default () => ({
  token: null,
  connectedUser: null,
  contactPharmacistDialog: false,
  activeConversations: [
    { conversationId: 1, name: "Vladimir Guez", isOpen: false },
    { conversationId: 2, name: "Olivier Tom", isOpen: false },
    { conversationId: 3, name: "Pierre Kyrhoul", isOpen: false }
  ]
});
