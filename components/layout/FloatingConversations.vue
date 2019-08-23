<template>
  <div v-show="show" class="floating-conversations-container">
    <v-container
      class="floating-conversations-holder"
      ma-0
      pa-0
      grid-list-xl
      fluid
    >
      <v-layout row wrap class="floating-conversations-holder2" align-end>
        <v-flex
          v-for="conversation in activeConversations"
          xs4
          class="floating-conversations-conversation"
          :key="conversation.conversationId"
        >
          <v-card
            v-show="!opennedConversations[conversation.conversationId]"
            class="content-pointer"
            @click.native="
              toggleConversation(conversation.conversationId, true)
            "
          >
            <v-icon
              style="float: right"
              @click.stop="deleteConversation(conversation.conversationId)"
              >close</v-icon
            >
            <div class="content-center text--baseColor text--section pa-2 ">
              <span class="text-breakline">{{ conversation.name }}</span>
            </div>
          </v-card>
          <v-card v-show="opennedConversations[conversation.conversationId]">
            <v-icon
              style="float: right"
              @click.stop="deleteConversation(conversation.conversationId)"
              >close</v-icon
            >
            <div
              class="content-center text--baseColor text--section pa-2 content-pointer  elevation-1"
              @click.stop="
                toggleConversation(conversation.conversationId, false)
              "
            >
              <span class="text-breakline">{{ conversation.name }}</span>
            </div>
            <v-card-text class="px-1">
              <conversation
                :conversation-id="conversation.conversationId"
                hide-title
                embed
              />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { REMOVE_CONVERSATION_FROM_BAR } from "../../store/types";
import take from "lodash.take";
import Conversation from "../messaging/Conversation";

export default {
  name: "FloatingConversations",
  components: { Conversation },
  data() {
    return {
      opennedConversations: {}
    };
  },
  computed: {
    show() {
      // only show if the user is connected and if we are not on messages page
      return (
        this.$store.getters.isLoggedIn &&
        !["/messages"].includes(this.$route.path) &&
        this.activeConversations.length > 0
      );
    },
    activeConversations() {
      const conversations = take(this.$store.state.activeConversations, 3);
      const conversationsIds = conversations.map(
        element => element.conversationId
      );
      conversationsIds.forEach(id => {
        if (this.opennedConversations[id] === undefined) {
          this.opennedConversations[id] = false;
        }
      });

      return conversations;
    }
  },
  methods: {
    toggleConversation(id, openState) {
      const copy = { ...this.opennedConversations };
      copy[id] = openState;
      // too trigger change
      this.opennedConversations = copy;
    },
    deleteConversation(id) {
      this.$store.commit(REMOVE_CONVERSATION_FROM_BAR, id);
    }
  }
};
</script>
