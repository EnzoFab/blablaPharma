import keyBy from "lodash.keyby";
import last from "lodash.last";

import { ADD_MESSAGES, ADD_CONVERSATIONS, UPDATE_CONVERSATION } from "../types";

export default {
  /**
   * messages: [
   *  id
   * ]
   *
   * @param {object} state
   * @param {Array} message
   */
  [ADD_MESSAGES]: (state, messages) => {
    state.messages = state.messages.concat(messages);
  },

  /**
   * conversations: [
   *  id, members: [{id, firstName, lastName, picture},...], messages: [
   * ]
   *
   * @param {object} state
   * @param {Array} conversations
   *
   */
  [ADD_CONVERSATIONS]: (state, conversations) => {
    // convert the array to an object
    const conversationsObject = keyBy(
      conversations.map(conversation => {
        const lastMessage = last(conversation.messages);
        const { id, members } = conversation;

        return { id, members, lastMessage };
      }),
      "id"
    );
    // add the new conversation the existing conversations
    state.conversations = { ...state.conversations, conversationsObject };
  },

  /**
   * Update the last message of a conversation
   *
   * @param {object} state
   * @param {number} conversationId
   * @param {object} message
   */
  [UPDATE_CONVERSATION]: (state, { conversationId, message }) => {
    const conversation = state.conversations[conversationId];
    if (conversation) {
      conversation.lastMessage = message;
    }
  }
};
