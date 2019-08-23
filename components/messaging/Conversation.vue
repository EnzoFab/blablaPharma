<template>
  <div>
    <v-toolbar
      v-show="!hideTitle"
      color="grey lighten-5"
      collapse
      flat
      class="ml-2 mb-2 pa-1 title-section text--baseColor"
      style="border-radius: 6px"
    >
      <v-btn
        v-show="showBackArrow"
        icon
        large
        outline
        color="grey"
        @click="$emit('conversation::back')"
      >
        <v-icon size="40" color="grey">arrow_back </v-icon>
      </v-btn>
      <v-toolbar-title class="text-truncate">{{
        receiverName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="">
        <v-icon color="grey darken-1" small>fas fa-ellipsis-h</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container my-0 pa-0 ml-1 grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 v-if="loading" class="content-center">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-flex>
        <v-flex mx-0 px-0 xs12 v-else>
          <v-container ma-0 py-0 fluid grid-list-xl>
            <v-layout
              row
              wrap
              :class="{
                'conversation-message-holder scroll-y': true,
                'conversation-normal': !embed,
                'conversation-small': embed
              }"
              :id="'conversation' + conversationId"
            >
              <v-flex v-for="message in messages" xs11 :key="message.id">
                <message
                  :author-fullname="message.authorFullName"
                  :author-id="message.userId"
                  :content="message.content"
                  :date="message.dateLabel"
                  :id="
                    'conversation' + conversationId + '-message' + message.id
                  "
                  :picture="message.picture"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mt-1 mb-0 pb-0 px-2 mx-2
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
    conversationId: { type: String | Number },
    receiverName: String,
    // only show the back arrow when the screen is small
    showBackArrow: { type: Boolean, default: false },
    hideTitle: { type: Boolean, default: false },

    // conversation is embed into a drawer
    embed: { type: Boolean, default: false }
  },
  components: { SendBox, Message },
  // todo async calls within computed functions
  asyncComputed: {
    async loadedMessage() {
      this.newMessages = [];
      this.loading = true;
      const conversationId = this.conversationId;
      Promise.resolve(setTimeout(() => (this.loading = false), 1500));
      return [
        {
          conversationId: conversationId,
          firstName: "Pierre",
          lastName: "Kiroul",
          userId: "ieriei",
          content: {
            type: "text",
            message: "Ok mec j'ai envie de tester qqch je peux ?"
          },
          date: new Date(),
          id: 1
        },
        {
          conversationId: conversationId,
          userId: "superId",
          firstName: "Max",
          lastName: "Ime",
          picture:
            "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
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
    }
  },
  computed: {
    messages() {
      const loadedMessage = this.loadedMessage;
      const m = [...loadedMessage, ...this.newMessages];
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
        const authorFullName = `${message.firstName} ${message.lastName}`;

        return { ...message, dateLabel, authorFullName };
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
      const option = { container: `#conversation${this.conversationId}` };
      this.$scrollTo(
        `#conversation${this.conversationId}-message${newMessage.id}`,
        300,
        option
      );
    }
  }
};
</script>
