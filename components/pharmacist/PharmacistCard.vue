<template>
  <v-container
    fluid
    pa-1
    fill-height
    :class="{
      'blue-grey lighten-5': $vuetify.breakpoint.xs
    }"
  >
    <v-layout row wrap align-center>
      <v-flex md8 lg3 align-center class="content-center">
        <v-avatar color="green" :size="size">
          <span v-if="!image" class="white--text display-2">{{
            initials
          }}</span>
          <v-img v-else :src="image" aspect-ratio="3.75"></v-img>
        </v-avatar>
      </v-flex>
      <v-flex
        xs8
        :class="{
          'px-5 pt-4': !$vuetify.breakpoint.xs,
          'content-center': $vuetify.breakpoint.xs
        }"
      >
        <div class="title-section-huge text--baseColor">{{ fullName }}</div>

        <div class="display-1 red--text text--darken-1 text-futura mt-4">
          {{ address }}
        </div>
        <div class="headline text--baseColor text-futura mt-3 ">
          {{ workplace }}
        </div>
        <div class="mt-3">
          <v-btn
            dark
            :block="$vuetify.breakpoint.xs"
            large
            depressed
            color="light-green lighten-1"
            @click="contact"
            >Contacter</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "PharmacistCard",
  props: {
    firstName: String,
    lastName: String,
    address: String,
    workplace: String,
    image: String,
    identifiant: String | Number
  },
  computed: {
    initials() {
      return `${this.firstName[0]}.${this.lastName[0]}`.toUpperCase();
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    size() {
      return this.$vuetify.breakpoint.xs ? 120 : 195;
    }
  },
  methods: {
    contact() {
      this.$emit("pharmacist-card::contact", {
        id: this.identifiant,
        firstName: this.firstName,
        lastName: this.lastName
      });
    }
  }
};
</script>

<style scoped></style>
