<template>
  <div
    :class="{
      'active-conversation': isActive,
      'aside-conversations-conversation pa-2 title-section-small  text--baseColor': true
    }"
  >
    <v-avatar :size="avatarSize">
      <v-img v-if="picture" :src="picture"></v-img>
      <v-icon v-else :color="avatarColor" :size="avatarSize">person_pin</v-icon>
    </v-avatar>
    <span
      :class="{
        'font-weight-bold pl-1': isActive,
        'black--text': messageNotRead
      }"
      >{{ firstName }} {{ lastName }}</span
    >
    <div
      :class="{
        'text-truncate text--section text-xs-left pl-5': true,
        'font-weight-bold black--text': messageNotRead,
        'font-italic': !messageNotRead
      }"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import get from "lodash.get";
export default {
  name: "AsideConversation",
  props: {
    firstName: String,
    lastName: String,
    lastMessage: Object,
    isActive: { type: Boolean, default: false },
    picture: String,
    role: String
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
    },
    avatarColor() {
      return this.role === "pharmacist" ? "default-green" : "default-grey";
    },
    avatarSize() {
      return this.$vuetify.breakpoint.smAndDown ? 35 : 45;
    },
    messageNotRead() {
      const connectedUserId = get(this.$store.getters, "connectedUser.id");
      const author = get(this.lastMessage, "author");
      const messageIsRead = get(this.lastMessage, "read", true);
      return connectedUserId !== author && !messageIsRead;
    }
  }
};
</script>
