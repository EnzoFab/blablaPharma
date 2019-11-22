import { SailSocketWrapper, triggerNotification } from "../../helpers";
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
  TOGGLE_NOTIFICATION_SOUND
} from "../types";
import get from "lodash.get";

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

  [RECEIVE_MESSAGE]: async ({ commit, state, rootState, getters }, message) => {
    commit(ADD_MESSAGES, [message]);

    const { conversation, content, type, author } = message;

    const conversationData = getters.getConversation(conversation);

    // if the conversation doesn't exist yet add it to the list of conversation
    if (!conversationData) {
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
      const sender = get(conversationData, "members", []).find(
        member => member.id === author
      );

      const { firstName, lastName } = sender
        ? sender
        : { firstName: "", lastName: "" };

      const title = `Nouveau message de ${firstName} ${lastName}`;
      const notificationContent =
        type === "text" ? content : "Vous a envoyé un message";
      const link = `/messages?active=${conversation}`;

      await triggerNotification(title, notificationContent, link);

      // not to execute the code on server side
      // because audio isn't defined server side
      if (state.notificationActivated === true) {
        const audio = new Audio("/sound/notification.ogg");
        await audio.play();
      }
    }
  },

  [FETCH_CONVERSATION]: async ({ commit, rootState }) => {
    const conversations = await SailSocketWrapper.get(
      rootState,
      "/conversations"
    );
    commit(
      ADD_CONVERSATIONS,
      conversations.filter(conversation => conversation.messages.length > 0)
    );
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

  /**
   *  To implement the "vu" on a message.
   *  The idea to only look at the last message of the conversation
   *  (of course this function isn't to be called  on a message send by the current user
   *  but on received message)
   *  When the last message of a conversation is read we consider that every other
   *  messages are read too
   *  So some message may have the read attribute to true, but it doesn't matter
   *  because we only take care of the last message of the conversation
   *
   * @param commit
   * @param rootState
   * @param {object} message
   */
  readMessage: ({ commit, rootState }, message) => {
    SailSocketWrapper.post(
      rootState,
      `/conversations/${message.conversation}/event/read`,
      { messageId: message.id }
    );

    commit(UPDATE_CONVERSATION, {
      conversationId: message.conversation,
      message: { ...message, read: true }
    });

    commit(UPDATE_MESSAGE, { id: message.id, newMessageData: { read: true } });
  },

  /**
   * Meant to be called when we receive the event that our message was read
   * @param commit
   * @param {object} message
   */
  messageWasRead: ({ commit }, message) => {
    commit(UPDATE_CONVERSATION, {
      conversationId: message.conversation,
      message: { ...message, read: true }
    });

    commit(UPDATE_MESSAGE, { id: message.id, newMessageData: { read: true } });
  },

  toggleSound({ commit }, value) {
    commit(TOGGLE_NOTIFICATION_SOUND, value);
  }
};
