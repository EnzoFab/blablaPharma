import { SEND_MESSAGE } from "../types";

import { SailSocketWrapper } from "../../helpers";

/**
 *
 * @returns {Function}
 */
const createWebsocketPlugin = () => {
  return store => {
    const socket = SailSocketWrapper.socketInstance;

    socket.on("event", data => {
      // do something
    });

    store.subscribe(mutation => {
      switch (mutation.type) {
        case SEND_MESSAGE:
          // the user send a message
          break;

        default:
          return;
      }
    });

    store.subscribeAction((action, state) => {
      switch (action.type) {
        case SEND_MESSAGE:
          // the user send a message
          break;

        default:
          return;
      }
    });
  };
};

export const plugins = [createWebsocketPlugin()];
