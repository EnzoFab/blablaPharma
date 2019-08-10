<template>
  <v-container ma-0 pa-0 grid-list-xl class="conversation">
    <v-layout row wrap>
      <v-flex xs12 v-if="loading" class="content-center">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-else>
        <v-container my-0 py-0 fluid grid-list-xl>
          <v-layout row wrap class="conversation-message-holder scroll-y">
            <v-flex
              v-for="message in messages"
              md8
              :key="message.id"
              :offset-md4="$store.getters.isCurrentUserMessage(message.author)"
              :offset-sm1="$store.getters.isCurrentUserMessage(message.author)"
              sm11
              xs12
              px-3
            >
              <message
                :author="message.author"
                :content="message.content"
                :id="'message' + message.id"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 mt-4 mb-0 pb-0 px-2 mx-2
        ><send-box @sendbox:messageSent="handleNewMessage"
      /></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Message from "./Message";
import SendBox from "./SendBox";
export default {
  name: "Conversation",
  props: {
    receiverId: { type: String }
  },
  components: { SendBox, Message },
  computed: {
    loadedMessage() {
      this.loading = true;
      const receiverId = this.receiverId;
      Promise.resolve(setTimeout(() => (this.loading = false), 1500));
      return [
        {
          author: "enzo",
          content: {
            type: "text",
            message:
              "Salut les zinzins j'aime vous parler car je vous apprécie beaucoup j'espère que vous en êtes conscient"
          },
          id: 1
        },
        {
          userId: receiverId,
          author: "Pierre",
          content: {
            type: "url",
            title: "Using URL previews in your web apps using JavaScript",
            description:
              "URL previews are a way of organizing the URLs in the textarea in such a way that the URL is visible in a more organized way to the user instead of a just plain link. The plain URL makes no sense most of the time because of the advent of",
            image:
              "http://blog.kiprosh.com/content/images/knowbuddy/249/original/URL_preview.png",
            url:
              "https://blog.kiprosh.com/using-url-previews-in-your-web-apps-using-javascript/"
          },
          id: 2
        }
      ];
    },
    messages() {
      return [...this.loadedMessage, ...this.newMessages];
    }
  },
  data() {
    return {
      loading: false,
      newMessages: []
    };
  },
  methods: {
    handleNewMessage(data) {
      const message = { ...data, id: this.messages.length + 1 };
      this.newMessages = [...this.newMessages, message];

      // todo save in BD, emit an event on socket io

      this.$nextTick(() => {
        this.scrollToNewMessage(message);
      });
    },

    scrollToNewMessage(newMessage) {
      const option = { container: ".conversation-message-holder" };
      this.$scrollTo(`#message${newMessage.id}`, 300, option);
    }
  }
};
</script>
