<template>
  <div
    :class="{
      'active-conversation': isActive,
      'aside-conversations-conversation pa-2 text-content text--baseColor': true
    }"
  >
    <span :class="{ 'font-weight-bold': isActive }"
      >{{ firstName }} {{ lastName }}</span
    >
    <div class="text-truncate font-italic text--section text-xs-left">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideConversation",
  props: {
    firstName: String,
    lastName: String,
    lastMessage: Object,
    isActive: { type: Boolean, default: false }
  },
  computed: {
    message() {
      if (!this.lastMessage) {
        return "";
      }

      const isCurrentUser = this.$store.getters.isCurrentUserMessage(
        this.lastMessage.author
      );
      switch (this.lastMessage.type) {
        case "image":
          return isCurrentUser
            ? "Vous avez envoyé une image"
            : "Vous a envoyé une image";
        case "file":
          return isCurrentUser
            ? "Vous avez envoyé un fichier"
            : "Vous a envoyé un fichier";
        default:
          return isCurrentUser
            ? `Vous: ${this.lastMessage.content}`
            : this.lastMessage.content;
      }
    }
  }
};
</script>

<style scoped></style>
