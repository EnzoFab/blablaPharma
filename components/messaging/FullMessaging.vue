<template>
  <v-container grid-list-xl>
    <v-layout row>
      <v-flex xs4 d-flex shrink class="messaging-aside">
        <v-layout column>
          <v-flex xs12>
            <v-text-field
              color="green"
              flat
              solo
              label="Search"
              prepend-inner-icon="search"
            ></v-text-field>
          </v-flex>
          <v-divider class="green"></v-divider>
          <v-flex xs12>
            <v-list
              two-line
              overflox-y-scroll
              style="height: 160px; overflow-y: scroll"
            >
              <template v-for="item in conversations">
                <v-list-tile
                  v-if="item.active"
                  :key="item.id"
                  avatar
                  @click=""
                  class="green"
                >
                  <v-list-tile-avatar>
                    <img :src="item.avatar" />
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    <v-list-tile-sub-title
                      v-html="item.lastMessage"
                    ></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                  v-else
                  :key="item.id"
                  avatar
                  @click="setActive(item.id)"
                >
                  <v-list-tile-avatar>
                    <img :src="item.avatar" />
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    <v-list-tile-sub-title
                      v-html="item.lastMessage"
                    ></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs8 grow>
        <conversation />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UrlPreview from "./UrlPreview";
import Conversation from "./Conversation";
export default {
  name: "FullMessaging",
  components: { Conversation, UrlPreview },
  props: {},
  data() {
    return {
      conversations: [
        {
          id: 1,
          name: "Roronora Zorro",
          avatar: "",
          lastMessage: new Date(),
          active: true
        },
        {
          id: 2,
          name: "Nidalee",
          avatar: "",
          lastMessage: new Date(),
          active: true
        },
        {
          id: 3,
          name: "Minato Namikaze",
          avatar: "",
          lastMessage: new Date(),
          active: false
        },
        {
          id: 4,
          name: "Itach Uchiha",
          avatar: "",
          lastMessage: new Date(),
          active: false
        }
      ]
    };
  },
  methods: {
    setActive(itemId) {
      this.conversations = this.conversations.map(conversation => {
        conversation.active =
          conversation.id === itemId && !conversation.active;
        return conversation;
      });
      // todo load the next conversation
    }
  }
};
</script>

<style scoped></style>
