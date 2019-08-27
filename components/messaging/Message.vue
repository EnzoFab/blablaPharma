<template>
  <div>
    <template v-if="embed">
      <div>
        <v-avatar color="light-grey" size="40">
          <v-img v-if="picture && picture.length > 0" :src="picture"></v-img>
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
          'pa-2': true,
          message: true,
          'message-sent': isMessageSent,
          'message-received': !isMessageSent
        }"
      >
        <url-preview
          v-if="content.type == 'url'"
          :url="content.url"
          :title="content.title"
          :preview="content.image"
          :description="content.description"
        />
        <div v-else class="mx-5">
          <div
            v-for="(word, i) in content.message.split('\n')"
            style="text-align: left"
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
    </template>

    <v-container v-else grid-list-xs fluid fill-height>
      <v-layout row wrap>
        <v-flex md3 sm12 class="content-center" ma-0 pa-0>
          <v-avatar color="light-grey" size="40">
            <v-img v-if="picture && picture.length > 0" :src="picture"></v-img>
            <v-icon v-else size="38" dark color="green">person_pin</v-icon>
          </v-avatar>
          <span
            :class="{
              'text--baseColor': !isMessageSent,
              'title-section-small font-weight-bold text-left ml-2 text-truncate': true
            }"
          >
            {{ authorFullname }}
          </span>
        </v-flex>
        <v-flex md8 sm8 offset-sm2 ma-0 pa-0>
          <div
            :class="{
              'pa-2': true,
              message: true,
              'message-sent': isMessageSent,
              'message-received': !isMessageSent
            }"
          >
            <url-preview
              v-if="content.type == 'url'"
              :url="content.url"
              :title="content.title"
              :preview="content.image"
              :description="content.description"
            />
            <div v-else class="mx-5">
              <div
                v-for="(word, i) in content.message.split('\n')"
                style="text-align: left"
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
      </v-layout>
    </v-container>
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
    authorId: String,
    date: String,
    picture: String,
    embed: { type: Boolean, default: false }
  },

  computed: {
    isMessageSent() {
      return this.$store.getters.isCurrentUserMessage(this.authorId);
    }
  }
};
</script>

<style scoped></style>
