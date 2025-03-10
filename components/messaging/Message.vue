<template>
  <div>
    <template v-if="embed || $vuetify.breakpoint.smAndDown">
      <div v-if="!hideAuthorName">
        <v-avatar color="light-grey lighten-4" size="25">
          <v-img
            v-if="picture"
            :src="picture"
            lazy-src="/images/empty.jpg"
            alt="conversation image"
          ></v-img>
          <v-icon v-else size="25" dark :color="avatarColor">person_pin</v-icon>
        </v-avatar>
        <span
          :class="{
            'text--baseColor': !isMessageSent,
            ' font-weight-bold text-left ml-2 text-truncate': true
          }"
        >
          {{ authorFullName }}
          <span class="text--tiny font-italic ml-2">
            {{ dateInformation() }}</span
          >
        </span>
      </div>
      <div
        :class="{
          'message ml-3 text-xs-center': true,
          'message-sent': isMessageSent,
          'message-received': !isMessageSent
        }"
      >
        <v-img
          class="message content-pointer"
          v-if="type === 'image'"
          :src="content"
          lazy-src="/images/empty.jpg"
          aspect-ratio="1.75"
          alt="Conversation image"
          @click="showFullImage"
        ></v-img>
        <div
          v-else
          :class="{
            [messageClassColorClass]: true,
            'text-xs-left pt-1 message pa-2 message-shrinkContent': true
          }"
        >
          <div v-for="(word, i) in content.split('\n')" :key="i">
            <span v-if="word.length > 0" class="text-breakline text--normal">{{
              word
            }}</span>
            <br v-else />
          </div>
        </div>
        <div class="text-xs-right" v-show="wasRead">
          <span class="font-italic text--baseColor">vu</span>
        </div>
        <div
          v-if="error"
          class="content-center red--text text--section font-italic"
        >
          Le message n'a pas pu être envoyé, Réessayer ?
          <v-btn
            icon
            small
            @click="resendMessage"
            :loading="buttonLoading"
            :disabled="buttonLoading"
            ><v-icon small color="black">fas fa-sync</v-icon></v-btn
          >
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
            xs12
            sm12
            class="text-xs-left"
            mx-1
            :my-1="hideAuthorName"
            :my-0="!hideAuthorName"
            pa-0
          >
            <template v-if="!hideAuthorName">
              <v-avatar color="light-grey lighten-4" size="40">
                <v-img
                  v-if="picture"
                  :src="picture"
                  lazy-src="/images/empty.jpg"
                  alt="Author image"
                ></v-img>
                <v-icon v-else size="38" dark :color="avatarColor"
                  >person_pin</v-icon
                >
              </v-avatar>
              <span
                :class="{
                  'text--baseColor': !isMessageSent,
                  ' font-weight-bold text-left ml-2 text-truncate': true
                }"
              >
                {{ authorFullName }}
              </span>
            </template>
          </v-flex>
          <v-flex md6 sm8 offset-md2 offset-sm2 ma-0 pa-0>
            <div
              :class="{
                'px-2': true,
                'py-2': !error,
                'message-sent': isMessageSent,
                'message-received': !isMessageSent
              }"
            >
              <v-img
                class="message pt-2 content-pointer"
                v-if="type === 'image'"
                :src="content"
                lazy-src="/images/empty.jpg"
                aspect-ratio="1.75"
                alt="Url Preview image"
                @click="showFullImage"
              ></v-img>

              <div
                v-else
                :class="{
                  [messageClassColorClass]: true,
                  'text-xs-left message pa-2 message-shrinkContent': true
                }"
              >
                <div v-for="(word, i) in content.split('\n')" :key="i">
                  <span
                    v-if="word.length > 0"
                    class="text-breakline text--section "
                    >{{ word }}</span
                  >
                  <br v-else />
                </div>
              </div>
              <div class="text-xs-right pt-1 pr-1" v-show="wasRead">
                <span class="font-italic text--baseColor">vu</span>
              </div>
              <div
                v-if="error"
                class="content-center red--text text--section font-italic"
              >
                Le message n'a pas pu être envoyé, Réessayer ?
              </div>
            </div>
          </v-flex>
          <v-flex v-if="error">
            <v-btn
              icon
              small
              @click="resendMessage"
              :loading="buttonLoading"
              :disabled="buttonLoading"
              ><v-icon small color="black">fas fa-sync</v-icon></v-btn
            >
          </v-flex>
          <v-flex v-if="!error" md2 sm1 v-show="hover">
            <span class="text--tiny text--baseColor font-weight-bold">{{
              dateInformation()
            }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    authorFullName: String,
    authorId: String | Number,
    createdAt: Number,
    content: String,
    // contained in a small window
    embed: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    hideAuthorName: { type: Boolean, default: false },
    isPharmacist: Boolean,
    picture: String,
    type: String,
    wasRead: Boolean
  },
  data() {
    return {
      buttonLoading: false
    };
  },

  computed: {
    isMessageSent() {
      return this.$store.getters.isCurrentUserMessage(this.authorId);
    },
    avatarColor() {
      return this.isPharmacist ? "default-green" : "default-grey";
    },
    messageClassColorClass() {
      return this.isMessageSent ? "default-green " : "default-grey lighten-4";
    }
  },
  methods: {
    resendMessage() {
      if (!this.buttonLoading) {
        this.buttonLoading = true;
        this.$emit("message::resend", {
          content: this.content,
          author: this.authorId,
          type: this.type,
          createdAt: new Date()
        });
        setTimeout(() => {
          this.buttonLoading = false;
        }, 1500);
      }
    },
    dateInformation() {
      const date = this.$moment(this.createdAt);
      const diff = this.$moment().diff(date);
      if (diff < 60000) {
        return "Il y a quelques secondes";
      }
      // less than 1 hours
      if (diff < 3.6e6) {
        return `il y a ${Math.ceil(diff / (60 * 1000))} minute(s)`;
      }
      // less than 1 day
      if (diff < 8.64e7) {
        return `il y a ${Math.ceil(diff / (60 * 60 * 1000))} heure(s)`;
      }
      return "Le " + date.format("Do MMMM YYYY");
    },
    showFullImage() {
      this.$emit("message::showFullImage", this.content);
    }
  }
};
</script>
