<template>
  <v-dialog v-model="showDialog" width="300">
    <v-card flat>
      <v-card-text class="content-center">
        <h2 class="title-section text--baseColor pb-1">
          <v-icon>warning</v-icon> Attention
        </h2>
        <div class="text-xs-center text--baseColor text--section">
          {{ text }}
        </div>
        <v-btn
          dark
          color="orange"
          small
          depressed
          @click="$emit('input', false)"
          >Ok</v-btn
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Alert",
  props: {
    value: Boolean,
    text: String
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      }
    }
  }
};
</script>
