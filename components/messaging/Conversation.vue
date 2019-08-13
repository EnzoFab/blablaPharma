<template>
  <div>
    <v-container my-0 pa-0 ml-1 grid-list-xl>
      <div class="ml-2 py-1 title-section text--baseColor">
        {{ receiverName }}
      </div>

      <v-layout row wrap>
        <v-flex xs12 v-if="loading" class="content-center">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-flex>
        <v-flex xs12 v-else>
          <v-container my-0 py-0 fluid grid-list-xl>
            <v-layout row wrap class="conversation-message-holder scroll-y">
              <v-flex v-for="message in messages" xs9 px-3 :key="message.id">
                <message
                  :author="message.author"
                  :content="message.content"
                  :date="message.dateLabel"
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
  </div>
</template>

<script>
import Message from "./Message";
import SendBox from "./SendBox";
import moment from "moment";
export default {
  name: "Conversation",
  props: {
    receiverId: String,
    receiverName: String
  },
  components: { SendBox, Message },
  computed: {
    loadedMessage() {
      this.newMessages = [];
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
          date: new Date(),
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
          date: moment().subtract(2, "hours"),
          id: 2
        }
      ];
    },
    messages() {
      const m = [...this.loadedMessage, ...this.newMessages];
      return m.map(message => {
        const date = moment(message.date);
        const diff = moment().diff(date);
        let dateLabel;

        //less than 1 minute
        if (diff < 60000) {
          dateLabel = "Il y a quelques secondes";
        }
        // less than 1 hours
        else if (diff < 3.6e6) {
          dateLabel = `il y a ${Math.ceil(diff / (60 * 1000))} minute(s)`;
        }
        // less than 1 day
        else if (diff < 8.64e7) {
          dateLabel = `il y a ${Math.ceil(diff / (60 * 60 * 1000))} heure(s)`;
        } else {
          dateLabel = "Le " + date.locale("fr").format("Do MMMM YYYY");
        }

        return { ...message, dateLabel };
      });
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
