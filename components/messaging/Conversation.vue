<template>
  <div>
    <v-toolbar
      v-show="!hideTitle"
      color="grey lighten-5"
      collapse
      flat
      class="ml-2 mb-2 pa-1 title-section text--baseColor"
      style="border-radius: 6px"
    >
      <v-btn
        v-show="showBackArrow"
        icon
        large
        outline
        color="grey"
        @click="$emit('conversation::back')"
      >
        <v-icon size="40" color="grey">arrow_back </v-icon>
      </v-btn>
      <v-toolbar-title class="text-truncate">{{
        receiverName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="">
        <v-icon color="grey darken-1" small>fas fa-ellipsis-h</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container my-0 pa-0 ml-1 grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 v-if="loading" class="content-center">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-flex>
        <v-flex mx-0 px-0 xs12 v-else>
          <v-container ma-0 py-0 fluid grid-list-xl @click="readMessage">
            <v-layout
              row
              wrap
              :class="{
                'conversation-message-holder scroll-y': true,
                'conversation-normal': !embed,
                'conversation-small': embed
              }"
              :id="'conversation' + conversationId"
            >
              <div
                v-show="messages.length > 5"
                class="conversation-scrollButtonWrapper"
              >
                <v-icon
                  :size="iconSize"
                  class="conversation-scrollButton conversation-scrollButton--top content-pointer"
                  @click="scrollTop"
                  >fas fa-angle-up</v-icon
                >
              </div>
              <v-flex xs12>
                <no-ssr>
                  <infinite-loading
                    :distance="infiniteLoaderDistance"
                    direction="top"
                    spinner="waveDots"
                    @infinite="infiniteHandler"
                  >
                    <div slot="no-more" class="text--baseColor text--tiny">
                      Vous êtes à jour
                    </div>
                    <div slot="no-results"></div>
                  </infinite-loading>
                </no-ssr>
              </v-flex>
              <v-flex
                v-if="messages.length === 0"
                class="content-center text--baseColor text--section pt-4"
              >
                Vous n'avez pas encore échangé avec avec
                <span class="font-weight-bold">{{ receiverName }}</span
                >.
                <div>Soyez le premier à envoyer un message.</div>
              </v-flex>
              <v-flex
                v-for="message in messages"
                xs12
                :key="message.id"
                :pt-3="!message.grouped"
                :pt-0="message.grouped"
                :mt-3="!message.grouped"
                :mt-0="message.grouped"
              >
                <message
                  :author-full-name="getMessageAuthorFullName(message.author)"
                  :author-id="message.author"
                  :content="message.content"
                  :type="message.type"
                  :created-at="message.createdAt"
                  :hide-author-name="message.grouped"
                  :id="
                    'conversation' + conversationId + '-message' + message.id
                  "
                  :isPharmacist="message.authorRole === 'pharmacist'"
                  :picture="message.picture"
                  :embed="embed"
                  :error="message.error"
                  :was-read="isMessageRead(message)"
                  @message::showFullImage="displayDialog"
                />
              </v-flex>

              <div
                v-show="messages.length > 5"
                class="conversation-scrollButtonWrapper"
              >
                <v-icon
                  :size="iconSize"
                  class="conversation-scrollButton conversation-scrollButton--down content-pointer"
                  @click="scrollBottom"
                  >fas fa-angle-down</v-icon
                >
              </div>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mt-1 mb-0 pb-0 px-2 mx-2 align-self-end
          ><send-box :embed="embed" @sendbox:messageSent="handleNewMessage"
        /></v-flex>
      </v-layout>
    </v-container>
    <full-image
      v-model="showDialog"
      :image-src="dialogImage"
      alt-src="message image"
    />
  </div>
</template>

<script>
import to from "await-to-js";
import last from "lodash.last";
import head from "lodash.head";
import debounce from "lodash.debounce";
import get from "lodash.get";

import { SEND_MESSAGE, FETCH_MESSAGE } from "../../store/types";
import FullImage from "../dialogs/FullImage";
const InfiniteLoading = () => import("vue-infinite-loading");

const Message = () => import("./Message");
const SendBox = () => import("./SendBox");
export default {
  name: "Conversation",
  components: { FullImage, SendBox, Message, InfiniteLoading },
  props: {
    conversationId: { type: String | Number },
    receiverName: String,
    // only show the back arrow when the screen is small
    showBackArrow: { type: Boolean, default: false },
    hideTitle: { type: Boolean, default: false },

    // conversation is embed into a drawer
    embed: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      infiniteLoadingActivate: false,
      watcherActivated: true,
      showDialog: false,
      dialogImage: null
    };
  },

  computed: {
    infiniteLoaderDistance() {
      return this.messages.length > 0 ? 50 : -Infinity;
    },
    getConversationData() {
      return this.$store.getters["chat/getConversation"](this.conversationId);
    },
    messagesFromStore() {
      // Get every messages from the store which related conversation match the current conversationId
      return this.$store.getters["chat/conversationMessages"](
        this.conversationId
      );
    },
    messages() {
      return this.messagesFromStore
        .sort((a, b) => a.createdAt - b.createdAt)

        .map((message, index, currentArray) => {
          const date = this.$moment(message.createdAt);

          const conversationData = this.getConversationData;

          const author = conversationData.members.find(
            member => member.id === message.author
          );

          const authorRole = author ? author.role : "unknown";
          const picture = author ? author.picture : null;

          // if you send a several message in a short amount of time, there are grouped together
          const previousMessage = index > 0 ? currentArray[index - 1] : null;
          const grouped =
            previousMessage && this.$store.getters.connectedUser
              ? previousMessage.author === message.author &&
                date.diff(this.$moment(previousMessage.createdAt)) <
                  60 * 3 * 1000
              : false;

          return { ...message, grouped, authorRole, picture };
        });
    },

    iconSize() {
      return this.embed ? 20 : 30;
    }
  },
  methods: {
    readMessage() {
      const connectedUserId = get(this.$store.getters, "connectedUser.id");
      const lastMessage = last(this.messages);

      if (!connectedUserId || !lastMessage) {
        return;
      }

      const notUserMessage = lastMessage.author !== connectedUserId;

      if (!notUserMessage || lastMessage.read) {
        return;
      }

      this.$store.dispatch("chat/readMessage", lastMessage);
    },

    infiniteHandler($state) {
      // stop the first load
      if (!this.infiniteLoadingActivate) {
        this.infiniteLoadingActivate = true;
        $state.loaded();
        return;
      }
      // when we scroll on the top of the conversation-message-holder container, load more messages
      const filters = {
        limit: 15,
        skip: this.messages.length
      };

      setTimeout(async () => {
        const [err, res] = await to(
          this.$store.dispatch(`chat/${FETCH_MESSAGE}`, {
            conversationId: this.conversationId,
            filters
          })
        );

        if (!err && res.length > 0) {
          $state.loaded();
          return;
        }

        $state.complete();
      }, 1000);
    },
    handleNewMessage(data) {
      // create an object with an unique which will be updated
      const message = {
        ...data,
        id: `h${this.conversationId}${this.messages.length + 1}`,
        conversation: this.conversationId
      };

      this.$store.dispatch(`chat/${SEND_MESSAGE}`, message);
    },
    /**
     * return true if message is read and the message isn't sent by the current user
     * @param {object} message
     * @return {Boolean}
     */
    isMessageRead(message) {
      //
      const connectedUserId = get(this.$store.getters, "connectedUser.id");
      const isUserMessage =
        connectedUserId && message.author === connectedUserId;
      const isLastMessage =
        get(this.getConversationData, "lastMessage.id") === message.id;

      return isUserMessage && isLastMessage && message.read;
    },

    /**
     * Center the window on the message
     * @param {object} message
     */
    scrollToMessage(message) {
      if (!message) {
        return;
      }

      const option = {
        container: `#conversation${this.conversationId}`,
        force: true,
        easing: "linear"
        // offset: -60
      };

      this.$scrollTo(
        `#conversation${this.conversationId}-message${message.id}`,
        300,
        option
      );
    },

    scrollBottom() {
      // scroll to the last message
      this.scrollToMessage(last(this.messages));
    },

    scrollTop() {
      // scroll to the first message
      this.scrollToMessage(head(this.messages));
    },

    /**
     *
     * @param {number} messageAuthor
     * @returns {string}
     */
    getMessageAuthorFullName(messageAuthor) {
      const author = this.getConversationData.members.find(
        member => member.id === messageAuthor
      );

      return author ? `${author.firstName} ${author.lastName}` : "Inconnu";
    },

    displayDialog(src) {
      this.dialogImage = src;
      this.showDialog = true;
    }
  },

  watch: {
    conversationId: {
      immediate: true,
      handler(newId) {
        this.infiniteLoadingActivate = false;
        this.loading = true;

        setTimeout(() => {
          const conversationMessages = this.$store.getters[
            "chat/conversationMessages"
          ](newId);

          if (conversationMessages.length === 0) {
            this.$store.dispatch(`chat/${FETCH_MESSAGE}`, {
              conversationId: newId,
              filters: { limit: 15, skip: 0 }
            });
          }

          const lastMessage = last(this.messages);
          this.loading = false;
          this.readMessage();
          if (lastMessage) {
            this.$nextTick(() => {
              this.scrollToMessage(lastMessage);
            });
          }
        }, 1500);
      }
    },
    messagesFromStore: debounce(function(newValue, oldValue) {
      if (!this.watcherActivated) {
        // to prevent double scroll
        return;
      }

      if (!newValue.length > 0 && !oldValue) {
        return;
      }

      // scroll to the end if we receive or send a message
      const lastNewValue = last(newValue);
      const lastOldValue = last(oldValue);

      if (
        // oldValue.length !== newValue.length &&
        !lastOldValue ||
        (lastNewValue && lastNewValue.id !== lastOldValue.id)
      ) {
        this.watcherActivated = false;
        this.scrollToMessage(lastNewValue);

        this.watcherActivated = true;
      }
    }, 50)
  }
};
</script>
