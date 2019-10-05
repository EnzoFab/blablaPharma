import get from "lodash.get";
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
   */
  getConversation: state => idConversation =>
    state.conversations[idConversation],

  /**
   *
   * @param state
   * @returns {function(*): boolean}
   */
  hasNewMessages: state => connectedUserId => {
    const conversations = Object.values(state.conversations);
    return conversations.some(conversation => {
      return (
        get(conversation, "lastMessage.author") !== connectedUserId &&
        !get(conversation, "lastMessage.read", true)
      );
    });
  }
};
