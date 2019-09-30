<template>
  <v-card flat color="grey lighten-5">
    <v-container fluid grid-list-xs fill-height>
      <v-layout row wrap align-center>
        <v-flex md12 lg4 class="content-center" pb-1>
          <v-avatar :size="size" v-if="image">
            <v-img
              aspect-ratio="2.75"
              :src="image"
              alt="Photo du pharmaciens"
            ></v-img>
          </v-avatar>

          <v-icon v-else :size="size" color="default-green">person_pin</v-icon>
        </v-flex>
        <v-flex md12 lg6 pa-0 ma-0 class="text--baseColor">
          <h2 class="title-section">{{ fullName }}</h2>
          <div class="text--section pt-2">
            <v-icon color="light-green lighten-4">fas fa-venus-mars</v-icon>
            <span class="pl-2">{{ pharmacistGender }}</span>
            <div>
              <v-icon color="light-green lighten-4">fas fa-user-md</v-icon>
              <span class="text-capitalize pl-2">
                {{ pharmacistStatus }}
              </span>
            </div>

            <div>
              <v-icon color="light-green lighten-4"
                >fas fa-map-marker-alt</v-icon
              >
              <span class="text-capitalize pl-2 ">
                {{ fullAddress }}
              </span>
            </div>

            <v-icon color="light-green lighten-4">home_work</v-icon>
            <span class="text-capitalize pl-2">{{ workplace }}</span>
          </div>
        </v-flex>
        <v-flex lg2 md8>
          <v-btn block dark depressed color="default-green" @click="contact"
            >Contacter</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PharmacistCard",
  props: {
    firstName: String,
    lastName: String,
    fullAddress: String,
    workplace: String,
    image: String,
    identifiant: String | Number,
    gender: String,
    status: String
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    size() {
      return this.$vuetify.breakpoint.mdAndUp ? 140 : 105;
    },
    pharmacistGender() {
      switch (this.gender) {
        case "male":
          return "Homme";
        case "female":
          return "Femme";
        default:
          return "Non renseigné";
      }
    },
    pharmacistStatus() {
      switch (this.status) {
        case "student":
          return "Etudiant";
        case "pharmacistBlablapharma":
          return "Pharmacien BlablaPharma";
        default:
          return "Pharmacien";
      }
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
