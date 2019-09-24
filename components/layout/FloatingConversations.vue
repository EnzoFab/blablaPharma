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
              <span class="text-breakline">{{ conversation.fullName }}</span>
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
              <span class="text-breakline">{{ conversation.fullName }}</span>
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
import {
  REMOVE_ACTIVE_CONVERSATION,
  FETCH_CONVERSATION
} from "../../store/types";
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
      if (this.$store.getters.isLoggedIn) {
        this.$store.dispatch(`chat/${FETCH_CONVERSATION}`);
      }
      // only show if the user is connected and if we are not on messages page
      return (
        this.$store.getters.isLoggedIn &&
        !["/messages"].includes(this.$route.path) &&
        this.activeConversations.length > 0
      );
    },
    activeConversations() {
      const conversationIds = take(
        this.$store.state.chat.activeConversations,
        3
      )
        // be sure that conversation exist before add it in the bar
        .filter(id => this.$store.getters["chat/getConversation"](id));

      return conversationIds.map(conversationId => {
        const conversation = this.$store.getters["chat/getConversation"](
          conversationId
        );
        // get the member who isn't the connected user
        const receiver = conversation.members.find(
          member => !this.$store.getters.isCurrentUserMessage(member.id)
        );
        const fullName = `${receiver.firstName} ${receiver.lastName}`;

        return {
          fullName,
          conversationId,
          lastMessage: conversation.lastMessage
        };
      });
    }
  },
  methods: {
    toggleConversation(id, openState) {
      this.opennedConversations[id] = openState;
    },
    deleteConversation(id) {
      this.$store.commit(`chat/${REMOVE_ACTIVE_CONVERSATION}`, id);
    }
  },
  watch: {
    activeConversations: {
      immediate: true,
      handler(newValue) {
        newValue.forEach(conversation => {
          if (
            this.opennedConversations[conversation.conversationId] === undefined
          ) {
            this.opennedConversations[conversation.conversationId] = true;
          }
        });
      }
    }
  }
};
</script>
