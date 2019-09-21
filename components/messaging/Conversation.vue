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
          <v-container ma-0 py-0 fluid grid-list-xl>
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
                xs11
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
                  :date="message.dateLabel"
                  :hide-author-name="message.grouped"
                  :id="
                    'conversation' + conversationId + '-message' + message.id
                  "
                  :picture="message.picture"
                  :embed="embed"
                  :error="message.error"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mt-1 mb-0 pb-0 px-2 mx-2 align-self-end
          ><send-box @sendbox:messageSent="handleNewMessage"
        /></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import { SEND_MESSAGE, FETCH_MESSAGE } from "../../store/types";

import Message from "./Message";
import SendBox from "./SendBox";
export default {
  name: "Conversation",
  props: {
    conversationId: { type: String | Number },
    receiverName: String,
    // only show the back arrow when the screen is small
    showBackArrow: { type: Boolean, default: false },
    hideTitle: { type: Boolean, default: false },

    // conversation is embed into a drawer
    embed: { type: Boolean, default: false }
  },
  components: { SendBox, Message },
  data() {
    return {
      loading: false
    };
  },

  computed: {
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
          const date = moment(message.createdAt);
          const diff = moment().diff(date);
          let dateLabel;

          //less than 1 minute
          if (diff < 60000) {
            dateLabel = "Il y a quelques secondes";
          }
          // less than 1 hours
          else if (diff < 3.6e6) {
            dateLabel = `il y a ${Math.ceil(diff / (60 * 1000))} minute(s)`;
          }
          // less than 1 day
          else if (diff < 8.64e7) {
            dateLabel = `il y a ${Math.ceil(diff / (60 * 60 * 1000))} heure(s)`;
          } else {
            dateLabel = "Le " + date.locale("fr").format("Do MMMM YYYY");
          }

          // if you send a several message in a short amount of time, there are grouped together
          const previousMessage = index > 0 ? currentArray[index - 1] : null;
          const grouped =
            previousMessage && this.$store.getters.connectedUser
              ? previousMessage.author === message.author &&
                date.diff(moment(previousMessage.createdAt)) < 60 * 3 * 1000
              : false;

          return { ...message, dateLabel, grouped };
        });
    }
  },
  methods: {
    handleNewMessage(data) {
      const message = {
        ...data,
        id: `h${this.conversationId}${this.messages.length + 1}`,
        conversation: this.conversationId
      };

      this.$store.dispatch(`chat/${SEND_MESSAGE}`, message);

      this.$nextTick(() => {
        this.scrollToMessage(message);
      });
    },

    /**
     * Center the window on the new message
     * @param {object} message
     */
    scrollToMessage(message) {
      const option = { container: `#conversation${this.conversationId}` };
      this.$scrollTo(
        `#conversation${this.conversationId}-message${message.id}`,
        300,
        option
      );
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

      return author
        ? `${author.firstName} ${author.lastName}`
        : "undefined undefined";
    }
  },

  watch: {
    conversationId() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 1500);

      /*if (this.messagesFromStore.length === 0) {
        this.$store.dispatch(`chat/${FETCH_MESSAGE}`, {
          conversationId: newValue,
          filters: { limit: 15, skip: 0 }
        });
      }*/
    }
  }
};
</script>
