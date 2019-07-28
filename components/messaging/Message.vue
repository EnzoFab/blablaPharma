<template>
  <div>
    <div
      :class="{
        'pa-2': true,
        message: true,
        'message-sent': isMessageSent,
        'message-received': !isMessageSent,
        'elevation-1': true
      }"
    >
      <url-preview
        v-if="content.type == 'url'"
        :url="content.url"
        :title="content.title"
        :preview="content.image"
        :description="content.description"
      />
      <span v-else>
        <span v-for="(word, i) in content.message.split('\n')">
          <span v-if="word.length > 0" class="text-breakline">{{ word }}</span>
          <br v-else />
        </span>
      </span>
    </div>
    <span class="caption font-italic" style="float: right">{{ author }}</span>
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
    date: Date
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
