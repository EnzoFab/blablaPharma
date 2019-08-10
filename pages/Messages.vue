<template>
  <v-container fluid grid-list-sm class="white">
    <v-layout row wrap>
      <v-flex xs2 pa-0 ma-0 class="aside-conversation">
        <div
          v-for="conversation in conversations"
          :key="conversation.id"
          :class="{
            'active-conversation':
              conversation.userId === activeConversation.userId,
            'aside-conversation-sender pa-2': true
          }"
          @click="activeConversation = conversation"
        >
          <div
            :class="{
              'font-weight-bold':
                conversation.userId === activeConversation.userId,
              'text--section text--baseColor': true
            }"
          >
            {{ conversation.firstName }} {{ conversation.lastName }}
          </div>
        </div>
      </v-flex>
      <v-flex xs10>
        <conversation :receiver-id="activeConversation.userId" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Conversation from "../components/messaging/Conversation";
import head from "lodash.head";
export default {
  name: "Messages",
  components: { Conversation },
  data() {},
  async asyncData({ app }) {
    // app.$axios.get()
    const conversations = [
      { userId: "1235", firstName: "Maxime", lastName: "Chatam" },
      { userId: "12356", firstName: "Pierre", lastName: "De Guize" }
    ];

    const activeConversation = head(conversations);
    return {
      conversations,
      activeConversation
    };
  },
  middleware: "connected"
};
</script>
