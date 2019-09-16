<template>
  <div>
    <template v-if="embed">
      <div v-if="!hideAuthorName">
        <v-avatar color="light-grey" size="40">
          <v-img
            v-if="picture && picture.length > 0"
            :src="picture"
            alt="conversation message"
          ></v-img>
          <v-icon v-else size="38" dark color="green">person_pin</v-icon>
        </v-avatar>
        <span
          :class="{
            'text--baseColor': !isMessageSent,
            'title-section-small font-weight-bold text-left ml-2 text-truncate': true
          }"
        >
          {{ authorFullname }}
          <span class="text--tiny font-italic ml-2"> {{ date }}</span>
        </span>
      </div>
      <div
        :class="{
          'message ml-3': true,
          'message-sent': isMessageSent,
          'message-received': !isMessageSent
        }"
      >
        <url-preview
          v-if="content.type === 'url'"
          :url="content.url"
          :title="content.title"
          :preview="content.image"
          :description="content.description"
        />
        <v-img
          v-else-if="content.type === 'image'"
          :src="content.message"
          aspect-ratio="1.75"
          alt="Conversation image"
        ></v-img>
        <div v-else>
          <div v-for="(word, i) in content.message.split('\n')" :key="i">
            <span
              v-if="word.length > 0"
              class="text-breakline text--normal grey--text text--darken-1"
              >{{ word }}</span
            >
            <br v-else />
          </div>
        </div>
      </div>
    </template>

    <v-hover v-else>
      <v-container
        slot-scope="{ hover }"
        py-0
        my-0
        grid-list-xs
        fluid
        fill-height
      >
        <v-layout row wrap>
          <v-flex
            md3
            sm12
            class="content-center"
            mx-1
            :my-1="hideAuthorName"
            :my-0="!hideAuthorName"
            pa-0
          >
            <template v-if="!hideAuthorName">
              <v-avatar color="light-grey" size="40">
                <v-img
                  v-if="picture && picture.length > 0"
                  :src="picture"
                  alt="Author image"
                ></v-img>
                <v-icon v-else size="38" dark color="green">person_pin</v-icon>
              </v-avatar>
              <span
                :class="{
                  'text--baseColor': !isMessageSent,
                  ' font-weight-bold text-left ml-2 text-truncate': true
                }"
              >
                {{ authorFullname }}
              </span>
            </template>
          </v-flex>
          <v-flex md6 sm6 offset-sm2 ma-0 pa-0>
            <div
              :class="{
                'pa-2': true,
                message: true,
                'message-sent': isMessageSent,
                'message-received': !isMessageSent
              }"
            >
              <url-preview
                v-if="content.type === 'url'"
                :url="content.url"
                :title="content.title"
                :preview="content.image"
                :description="content.description"
              />
              <v-img
                v-else-if="content.type === 'image'"
                :src="content.message"
                aspect-ratio="1.75"
                alt="Url Preview image"
              ></v-img>

              <div v-else>
                <div
                  v-for="(word, i) in content.message.split('\n')"
                  style="text-align: left"
                  class="content-center"
                  :key="i"
                >
                  <span
                    v-if="word.length > 0"
                    class="text-breakline text--normal grey--text text--darken-1"
                    >{{ word }}</span
                  >
                  <br v-else />
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex md2 sm1 v-show="hover">
            <span class="text--tiny text--baseColor font-weight-bold">{{
              date
            }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-hover>
  </div>
</template>

<script>
import UrlPreview from "./UrlPreview";
export default {
  name: "Message",
  components: { UrlPreview },
  props: {
    content: Object,
    authorFullname: String,
    authorId: String | Number,
    date: String,
    picture: String,
    embed: { type: Boolean, default: false },
    hideAuthorName: { type: Boolean, default: false }
  },

  computed: {
    isMessageSent() {
      return this.$store.getters.isCurrentUserMessage(this.authorId);
    }
  }
};
</script>
