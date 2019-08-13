<template>
  <div>
    <div
      class="title-section-small text--baseColor text-capitalize font-weight-bold text-left ml-2"
    >
      {{ author }}
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
      <div v-else>
        <div
          v-for="(word, i) in content.message.split('\n')"
          style="text-align: left"
          :key="i"
        >
          <span
            v-if="word.length > 0"
            class="text-breakline text--section grey--text text--darken-1"
            >{{ word }}</span
          >
          <br v-else />
        </div>
      </div>
    </div>
    <span class="caption font-italic">{{ date }}</span>
  </div>
</template>

<script>
import UrlPreview from "./UrlPreview";
export default {
  name: "Message",
  components: { UrlPreview },
  props: {
    content: Object,
    author: String,
    date: String
  },

  computed: {
    isMessageSent() {
      return this.$store.getters.isCurrentUserMessage(this.author);
    }
  },
  methods: {}
};
</script>

<style scoped></style>
