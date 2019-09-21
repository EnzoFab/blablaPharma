import { SailSocketWrapper } from "../../helpers";
import to from "await-to-js";
import pickBy from "lodash.pickby";
import reduce from "lodash.reduce";

import {
  SEND_MESSAGE,
  ADD_MESSAGES,
  UPDATE_CONVERSATION,
  FETCH_CONVERSATION,
  CONTACT_PHARMACIST,
  ADD_CONVERSATIONS,
  UPDATE_MESSAGE,
  FETCH_MESSAGE,
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
   * @param conversationId
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
  },

  [SEND_MESSAGE]: async ({ commit, rootState }, message) => {
    commit(ADD_MESSAGES, [message]);
    commit(UPDATE_CONVERSATION, {
      message,
      conversationId: message.conversation
    });

    try {
      const { type, content, conversation } = message;
      const { createdAt, id } = await SailSocketWrapper.post(
        rootState,
        `/conversations/${conversation}/messages`,
        { type, content }
      );
      commit(UPDATE_MESSAGE, {
        id: message.id,
        newMessageData: { createdAt, id }
      });
    } catch (e) {
      commit(UPDATE_MESSAGE, {
        id: message.id,
        newMessageData: { error: true }
      });
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
