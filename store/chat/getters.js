export default {
  /**
   *  Filter messages which belong to the conversation given in argument
   *
   * @param state
   * @returns {Function<Array>}
   */
  conversationMessages: state => idConversation =>
    state.messages.filter(message => idConversation === message.conversation),

  /**
   *
   * @param state
   * @returns {function(*): *}
   */ getConversation: state => idConversation =>
    state.conversations[idConversation]
};
