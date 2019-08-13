<template>
  <v-container fluid grid-list-xl class="white" fill-height>
    <v-layout row wrap align-center>
      <v-flex xs3 pa-0 ma-0>
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
          <div
            v-for="conversation in filterConversation"
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
        </div>
      </v-flex>
      <v-flex xs9>
        <conversation
          :receiver-id="activeConversation.userId"
          :receiver-name="activeConversationFullName"
        />
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
      searchWord: null
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
    }
  },
  async asyncData({ app }) {
    // app.$axios.get()
    const conversations = [
      { userId: "1235", firstName: "Maxime", lastName: "Chatam" },
      { userId: "1", firstName: "Pauline", lastName: "Line" },
      { userId: "12", firstName: "Samantha", lastName: "Oups" },
      { userId: "123", firstName: "Jeanne", lastName: "D'arc" },
      { userId: "12355", firstName: "Marcus", lastName: "Rashford" },
      { userId: "12356", firstName: "Paul", lastName: "Pogba" },
      { userId: "12357", firstName: "Lucie", lastName: "Pauls" },
      { userId: "123545", firstName: "Lisa", lastName: "Razu" },
      { userId: "03", firstName: "Maxime", lastName: "Chatam" },
      { userId: "12345675", firstName: "Maxime", lastName: "Chatam" },
      { userId: "123(465-(", firstName: "Maxime", lastName: "Chatam" },
      { userId: "1235506969g", firstName: "Maxime", lastName: "Chatam" },
      { userId: "1235656402333", firstName: "Pierre", lastName: "De Guize" }
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
