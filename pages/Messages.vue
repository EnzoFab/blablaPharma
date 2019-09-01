<template>
  <v-container fluid grid-list-xl class="white" fill-height>
    <v-layout row wrap align-start>
      <v-flex sm12 md3 pa-0 ma-0 v-show="!displayConversation">
        <v-text-field
          v-model="searchWord"
          flat
          box
          solo
          light
          clearable
          type="text"
          append-icon="search"
          placeholder="Rechercher un pharmacien"
        ></v-text-field>
        <div class="ma-0 aside-conversation scroll-y">
          <template v-if="filterConversation.length > 0">
            <div
              v-for="conversation in filterConversation"
              :key="conversation.conversationId"
              :class="{
                'active-conversation':
                  conversation.conversationId ===
                  activeConversation.conversationId,
                'aside-conversation-sender pa-2': true
              }"
              @click="selectConversation(conversation)"
            >
              <div
                :class="{
                  'font-weight-bold':
                    conversation.conversationId ===
                    activeConversation.conversationId,
                  'text--section text--baseColor': true
                }"
              >
                {{ conversation.firstName }} {{ conversation.lastName }}
              </div>
            </div>
          </template>
          <div v-else class="content-center text--section text--baseColor mt-2">
            Aucune conversation
          </div>
        </div>
      </v-flex>
      <v-flex v-show="!isSmallScreen || displayConversation" sm12 md9>
        <v-fade-transition>
          <conversation
            :conversation-id="activeConversation.conversationId"
            :receiver-name="activeConversationFullName"
            :show-back-arrow="isSmallScreen"
            @conversation::back="hideConversation"
          />
        </v-fade-transition>
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
  data() {
    return {
      searchWord: null,
      displayConversation: false
    };
  },
  computed: {
    filterConversation() {
      if (!this.searchWord || this.searchWord.length === 0) {
        return this.conversations;
      }
      const [word1, word2] = this.searchWord.split(" ");
      const filterFunction = element => {
        // if word1 != undefined => matchFistName = true if the firstName
        // otherwise return true
        const matchWord1 = word1
          ? element.firstName
              .toLocaleLowerCase()
              .includes(word1.toLocaleLowerCase()) ||
            element.lastName
              .toLocaleLowerCase()
              .includes(word1.toLocaleLowerCase())
          : true;

        // same as matchWord2
        const matchWord2 = word2
          ? element.firstName
              .toLocaleLowerCase()
              .includes(word2.toLocaleLowerCase()) ||
            element.lastName
              .toLocaleLowerCase()
              .includes(word2.toLocaleLowerCase())
          : true;

        return matchWord1 && matchWord2;
      };

      return this.conversations.filter(filterFunction);
    },
    activeConversationFullName() {
      const firstName = this.activeConversation.firstName;
      const lastName = this.activeConversation.lastName;

      return `${firstName} ${lastName}`;
    },
    isSmallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    hideConversation() {
      this.displayConversation = false;
    },
    selectConversation(conversation) {
      this.activeConversation = conversation;
      this.displayConversation = this.isSmallScreen ? true : false;
    }
  },
  async asyncData({ app }) {
    // app.$axios.get()
    const conversations = [
      { conversationId: "1235", firstName: "Maxime", lastName: "Chatam" },
      { conversationId: "1", firstName: "Pauline", lastName: "Line" },
      { conversationId: "12", firstName: "Samantha", lastName: "Oups" },
      { conversationId: "123", firstName: "Jeanne", lastName: "D'arc" },
      { conversationId: "12355", firstName: "Marcus", lastName: "Rashford" },
      { conversationId: "12356", firstName: "Paul", lastName: "Pogba" },
      { conversationId: "12357", firstName: "Lucie", lastName: "Pauls" },
      { conversationId: "123545", firstName: "Lisa", lastName: "Razu" },
      { conversationId: "03", firstName: "Maxime", lastName: "Chatam" },
      { conversationId: "12345675", firstName: "Maxime", lastName: "Chatam" },
      { conversationId: "123(465-(", firstName: "Maxime", lastName: "Chatam" },
      {
        conversationId: "1235506969g",
        firstName: "Maxime",
        lastName: "Chatam"
      },
      {
        conversationId: "1235656402333",
        firstName: "Pierre",
        lastName: "De Guize"
      }
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
