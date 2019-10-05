import {
  ADD_ACTIVE_CONVERSATIONS,
  REMOVE_ACTIVE_CONVERSATION,
  RECEIVE_MESSAGE
} from "./types";

import { SailSocketWrapper } from "../helpers";

/**
 *
 * @returns {Function}
 */
const createWebsocketPlugin = () => {
  return store => {
    const socket = SailSocketWrapper.socketInstance;

    socket.on("event:read", message => {
      store.dispatch(`chat/messageWasRead`, message);
    });

    socket.on("message", message => {
      store.dispatch(`chat/${RECEIVE_MESSAGE}`, message);
    });

    store.subscribe(mutation => {
      if (
        [
          `chat/${ADD_ACTIVE_CONVERSATIONS}`,
          `chat/${REMOVE_ACTIVE_CONVERSATION}`
        ].includes(mutation.type)
      ) {
        if (process.client) {
          store.$cookies.remove("activeConversations");
          store.$cookies.set(
            "activeConversations",
            store.state.chat.activeConversations
          );
        }
      }
    });
  };
};

export const plugins = [createWebsocketPlugin()];
