import { SailSocketWrapper } from "../../helpers";
import to from "await-to-js";
import {
  SEND_MESSAGE,
  ADD_MESSAGES,
  UPDATE_CONVERSATION,
  CONTACT_PHARMACIST
} from "../types";

/*
  Use actions to execute request to the server and also some mutations
 */
export default {
  [SEND_MESSAGE]: async ({ commit, rootState }, payload) => {
    // todo socket action

    commit(ADD_MESSAGES, [payload]);
    commit(UPDATE_CONVERSATION, {
      message: payload,
      conversationId: payload.conversation
    });
  },

  [CONTACT_PHARMACIST]: async (
    { commit, rootState },
    { memberId, message }
  ) => {
    const [e, r] = await to(
      SailSocketWrapper.post(rootState, "/conversations", { memberId })
    );

    console.log(e, r);
  }
};
