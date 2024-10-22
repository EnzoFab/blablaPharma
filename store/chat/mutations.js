import keyBy from "lodash.keyby";
import last from "lodash.last";
import pickBy from "lodash.pickby";
import union from "lodash.union";
import unionWith from "lodash.unionwith";
import isEqual from "lodash.isequal";
import take from "lodash.take";

import {
  ADD_MESSAGES,
  ADD_CONVERSATIONS,
  UPDATE_CONVERSATION,
  ADD_ACTIVE_CONVERSATIONS,
  REMOVE_ACTIVE_CONVERSATION,
  REMOVE_MESSAGES_FROM_STORE,
  REMOVE_CONVERSATIONS_FROM_STORE,
  UPDATE_MESSAGE,
  TOGGLE_NOTIFICATION_SOUND
} from "../types";

export default {
  /**
   * messages: [
   *  id, content, type, createdAt, author, conversation
   * ]
   *
   * @param {object} state
   * @param {Array} message
   */
  [ADD_MESSAGES]: (state, messages) => {
    // union without duplicating object
    state.messages = unionWith(state.messages, messages, isEqual);
  },

  /**
   *  update an existing message
   *
   * @param state
   * @param payload
   */
  [UPDATE_MESSAGE]: (state, payload) => {
    const messageToUpdate = state.messages.find(
      message => message.id === payload.id
    );

    if (messageToUpdate) {
      const index = state.messages.indexOf(messageToUpdate);
      state.messages.splice(index, 1, {
        ...messageToUpdate,
        ...pickBy(payload.newMessageData)
      });
    }

    /* state.messages = state.messages.map(message => {
      if (message.id === payload.id) {
        // remove empty and null data of the payload and replace the rest from the message
        return { ...message, ...pickBy(payload.newMessageData) };
      }
      return message;
    }); */
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
        const { id, members, createdAt } = conversation;

        return { id, members, lastMessage, createdAt };
      }),
      "id"
    );
    // add the new conversation the existing conversations
    state.conversations = { ...conversationsObject, ...state.conversations };
  },

  /**
   *
   * @param {Object} state
   * @param {Array<number>} ids
   */
  [ADD_ACTIVE_CONVERSATIONS]: (state, ids) => {
    // if a conversation is in the 3 visible conversation
    // we don't push it at the beginning of the array
    const visibleConversation = take(state.activeConversations, 3);
    const filterIds = ids.filter(id => !visibleConversation.includes(id));

    state.activeConversations = union(filterIds, state.activeConversations);
  },

  [REMOVE_ACTIVE_CONVERSATION]: (state, id) => {
    state.activeConversations = state.activeConversations.filter(
      conversationId => conversationId !== id
    );
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
  },

  [REMOVE_MESSAGES_FROM_STORE]: state => {
    state.messages = [];
  },

  [REMOVE_CONVERSATIONS_FROM_STORE]: state => {
    state.conversations = {};
    state.activeConversations = [];
  },

  [TOGGLE_NOTIFICATION_SOUND]: (state, notificationActivated) => {
    state.notificationActivated = notificationActivated;
  }
};
