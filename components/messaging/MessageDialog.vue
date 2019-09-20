<template>
  <v-dialog v-model="showDialog" min-width="400" max-width="600">
    <v-card flat color="grey lighten-5">
      <v-card-text class="content-center title-section text--baseColor mb-5">
        <v-icon size="20" class="mb-3" @click="$emit('input', false)"
          >close</v-icon
        >

        <div>{{ receiverFullName }}</div>
      </v-card-text>
      <send-box class="mx-3" @sendbox:messageSent="sendMessage" />
    </v-card>
  </v-dialog>
</template>

<script>
import SendBox from "./SendBox";
import { CONTACT_PHARMACIST } from "../../store/types";

export default {
  name: "MessageDialog",
  components: { SendBox },
  props: {
    receiverId: String | Number,
    receiverFirstName: String,
    receiverLastName: String,
    value: Boolean
  },

  computed: {
    receiverFullName() {
      return `${this.receiverFirstName} ${this.receiverLastName}`;
    },
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    sendMessage(message) {
      // todo $axios to save message
      // todo emit socket io event
      this.$store.dispatch(`chat/${CONTACT_PHARMACIST}`, {
        memberId: this.receiverId,
        message
      });
      this.$emit("input", false);
    }
  }
};
</script>
