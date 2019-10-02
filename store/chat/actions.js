import { SailSocketWrapper } from "../../helpers";
import pickBy from "lodash.pickby";
import reduce from "lodash.reduce";

import {
  SEND_MESSAGE,
  ADD_MESSAGES,
  UPDATE_CONVERSATION,
  FETCH_CONVERSATION,
  ADD_ACTIVE_CONVERSATIONS,
  CONTACT_PHARMACIST,
  ADD_CONVERSATIONS,
  UPDATE_MESSAGE,
  FETCH_MESSAGE,
  RECEIVE_MESSAGE,
  IS_TYPING
} from "../types";

/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  /**
   *
   * @param commit
   * @param rootState
   * @param {string} conversationId
   * @param filters
   * @returns {Promise<void>}
   */
  [FETCH_MESSAGE]: async (
    { commit, rootState },
    { conversationId, filters }
  ) => {
    const queryParam = reduce(
      pickBy(filters),
      (result, value, key) => {
        return `${result}&${key}=${value}`;
      },
      "?"
    );

    const messages = await SailSocketWrapper.get(
      rootState,
      `/conversations/${conversationId}/messages${queryParam}`
    );

    commit(ADD_MESSAGES, messages);

    return messages;
  },

  [SEND_MESSAGE]: async ({ commit, rootState }, message) => {
    commit(ADD_MESSAGES, [message]);

    try {
      // const { type, content, conversation } = message;
      const { createdAt, id, content } = await SailSocketWrapper.post(
        rootState,
        `/conversations/${message.conversation}/messages`,
        { type: message.type, content: message.content }
      );

      commit(UPDATE_CONVERSATION, {
        message,
        conversationId: message.conversation
      });

      commit(UPDATE_MESSAGE, {
        id: message.id,
        newMessageData: { createdAt, id, content }
      });

      commit(ADD_ACTIVE_CONVERSATIONS, [message.conversation]);
    } catch (e) {
      console.log(e);
      commit(UPDATE_MESSAGE, {
        id: message.id,
        newMessageData: { error: true }
      });
    }
  },

  [RECEIVE_MESSAGE]: async ({ commit, rootState, getters }, message) => {
    commit(ADD_MESSAGES, [message]);

    // if the conversation doesn't exist yet add it to the list of conversation
    if (!getters.getConversation(message.conversations)) {
      const conversation = await SailSocketWrapper.get(
        rootState,
        `/conversations/${message.conversation}`
      );

      commit(ADD_CONVERSATIONS, [conversation]);
    }

    commit(UPDATE_CONVERSATION, {
      message,
      conversationId: message.conversation
    });

    // add the conversations as active one
    commit(ADD_ACTIVE_CONVERSATIONS, [message.conversation]);

    if (process.client) {
      // not to execute the code on server side
      // because audio isn't defined server side
      const audio = new Audio("/sound/notification.ogg");
      await audio.play();
    }
  },

  [FETCH_CONVERSATION]: async ({ commit, rootState }) => {
    const conversations = await SailSocketWrapper.get(
      rootState,
      "/conversations"
    );
    commit(ADD_CONVERSATIONS, conversations);
  },

  [CONTACT_PHARMACIST]: async ({ commit, rootState }, memberId) => {
    const conversation = await SailSocketWrapper.post(
      rootState,
      "/conversations",
      {
        memberId
      }
    );

    commit(ADD_CONVERSATIONS, [conversation]);

    return conversation.id;
  },

  [IS_TYPING]: async ({ commit, rootState }, conversationId) => {
    // to warn the user that i'm typing in the conversation
    await SailSocketWrapper.post(
      rootState,
      `/conversations/${conversationId}/events`,
      { type: "typing" }
    );
  }
};
