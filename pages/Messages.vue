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
        <div class="mb-3 aside-conversations scroll-y">
          <template v-if="filterConversation.length > 0">
            <aside-conversation
              v-for="conversation in filterConversation"
              :first-name="conversation.firstName"
              :last-name="conversation.lastName"
              :last-message="conversation.lastMessage"
              :picture="conversation.picture"
              :role="conversation.role"
              :key="conversation.id"
              :is-active="
                activeConversation && conversation.id === activeConversation.id
              "
              @click.native="selectConversation(conversation)"
            />
          </template>
          <div v-else class="content-center text--section text--baseColor mt-2">
            Aucune conversation
          </div>
        </div>
      </v-flex>
      <v-flex v-show="!isSmallScreen || displayConversation" sm12 md9>
        <v-fade-transition>
          <conversation
            v-if="activeConversation"
            :conversation-id="activeConversation.id"
            :receiver-name="activeConversationFullName"
            :show-back-arrow="isSmallScreen"
            @conversation::back="hideConversation"
          />
          <div
            v-else
            class="text-xs-center pt-5 text--baseColor title-section-small"
          >
            Aucune conversation selectionnée
          </div>
        </v-fade-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
const Conversation = () => import("../components/messaging/Conversation");
//import head from "lodash.head";
import AsideConversation from "../components/messaging/AsideConversation";
export default {
  name: "Messages",
  middleware: "connected",
  components: { AsideConversation, Conversation },
  data() {
    return {
      searchWord: null,
      displayConversation: false,
      activeConversation: null
    };
  },
  computed: {
    ...mapState({
      conversationsFromStore: state =>
        Object.values(state.chat.conversations)
          .map(conversation => {
            const recipient = conversation.members.find(
              member => member.id !== state.connectedUser.id
            );
            const { firstName, lastName, role, picture } = recipient
              ? recipient
              : {
                  firstName: "Inconnu",
                  lastName: "",
                  role: "unknown",
                  picture: null
                };

            return {
              id: conversation.id,
              firstName,
              lastName,
              role,
              picture,
              lastMessage: conversation.lastMessage,
              createdAt: conversation.createdAt
            };
          })
          .sort((a, b) => {
            const timeStamp1 = a.lastMessage
              ? a.lastMessage.createdAt
              : a.createdAt;
            const timeStamp2 = b.lastMessage
              ? b.lastMessage.createdAt
              : b.createdAt;

            return timeStamp2 - timeStamp1;
          })
    }),
    activeRouteParam() {
      const { active } = this.$route.query
        ? this.$route.query
        : { active: null };

      return active;
    },
    conversations() {
      const conversations = this.conversationsFromStore;

      if (!this.activeConversation) {
        const conversation = conversations.find(
          conversation => conversation.id === this.activeRouteParam
        );

        // select the conversation from given by the queryparam if it exists
        // or the first conversation
        if (conversation) {
          this.selectConversation(conversation, false);
        } /*else {
          this.selectConversation(head(conversations), false);
        }*/
      }

      return conversations;
    },

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
      const firstName = this.activeConversation
        ? this.activeConversation.firstName
        : "Undefined";
      const lastName = this.activeConversation
        ? this.activeConversation.lastName
        : "Undefined";

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
    /**
     * Set the active conversation and display it
     * Change also the url of the router
     *
     * @param {Object} conversation
     * @param {Boolean} urlChange
     */
    selectConversation(conversation, urlChange = true) {
      if (conversation) {
        // if there isn't any message in this conversation, fetch new messages
        this.activeConversation = conversation;

        this.displayConversation = !!this.isSmallScreen;

        // change the url
        if (urlChange) {
          this.$router.push({
            path: "/messages",
            query: { active: conversation.id }
          });
        }
      }
    }
  }
};
</script>
