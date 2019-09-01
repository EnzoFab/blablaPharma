<template>
  <v-container fluid grid-list-md pa-2 ma-2>
    <v-layout row wrap>
      <v-flex
        md4
        :offset-sm2="$vuetify.breakpoint.smAndDown"
        sm8
        pa-2
        :class="{
          'content-center': true,
          'profile--section-image': $vuetify.breakpoint.mdAndUp
        }"
      >
        <v-avatar
          :color="pharmacistData ? 'green' : 'grey'"
          :size="$vuetify.breakpoint.smAndDown ? 120 : 200"
          tile
        >
          <v-img
            v-if="user.picture"
            :src="user.picture"
            alt="profile-img"
          ></v-img>
          <div v-else class="content-center">
            <v-icon :size="$vuetify.breakpoint.smAndDown ? 100 : 170" dark
              >person</v-icon
            >
          </div>
        </v-avatar>
      </v-flex>
      <v-flex md8 :offset-sm2="$vuetify.breakpoint.smAndDown" sm8>
        <v-card
          :class="{ 'pl-2': true, 'pt-2': $vuetify.breakpoint.smAndDown }"
          color="transparent"
          flat
        >
          <h2 class="title-section text--baseColor mb-2 ml-3">
            <u>{{ user.firstName }} {{ user.lastName }}</u>
            <v-btn
              class="content--right"
              icon
              @click="$emit('generalinformation::updateinformation')"
            >
              <v-icon :color="'grey lighten-1'" size="20">fas fa-edit</v-icon>
            </v-btn>
          </h2>

          <v-card-text
            :class="{
              'text-futura title-section-small text--baseColor ': true,
              'profile--section-general-information':
                $vuetify.breakpoint.mdAndUp
            }"
          >
            <div>
              <span class="ml-1"> {{ user.email }} </span>
            </div>

            // date naissance à venir
            <div>
              <v-icon color="grey lighten-1">{{ gender.icon }}</v-icon>
              <span class="ml-1">{{ gender.label }}</span>
            </div>
            <div>
              <v-icon color="grey lighten-1">fas fa-calendar-plus</v-icon>
              <span class="ml-1">
                Compte créé le {{ format(user.createdAt) }}</span
              >
            </div>
          </v-card-text>

          <v-card-text
            v-if="pharmacistData"
            :class="{
              'text-futura title-section-small text--baseColor ': true,
              'profile--section-general-information':
                $vuetify.breakpoint.mdAndUp
            }"
          >
            <h2 class=" headline text--baseColor mb-2">
              <u>{{ pharmacistRole }}</u>
              <v-btn
                class="content--right"
                icon
                @click="$emit('generalinformation::updatePharmacist')"
              >
                <v-icon :color="'grey lighten-1'" size="20">fas fa-edit</v-icon>
              </v-btn>
            </h2>
            <div class="ml-1">
              {{ pharmacistIdLabel }}: {{ pharmacistData.professionalId }}
            </div>
            <div class="ml-1">
              {{ pharmacistAddress }}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "GeneralInformation",
  computed: {
    gender() {
      const user = this.user;
      if (user.gender === "male") {
        return { label: "Homme", icon: "fas fa-mars" };
      }

      if (user.gender === "female") {
        return { label: "Femme", icon: "fas fa-venus" };
      }

      return { label: "Non précisé", icon: "fas fa-genderless" };
    },
    pharmacistRole() {
      const pharmacistRole = this.pharmacistData.professionLabel;
      return pharmacistRole.toLocaleLowerCase() === "student"
        ? "Etudiant en pharmacie"
        : "Pharmacien";
    },

    pharmacistAddress() {
      const institutionName = this.pharmacistData.institutionName;
      const address = this.pharmacistData.address;
      const postalCode = this.pharmacistData.postalCode;
      const city = this.pharmacistData.city;

      return `${institutionName}. ${address}, ${postalCode} ${city}`;
    },

    pharmacistIdLabel() {
      return this.pharmacistData.professionLabel.toLocaleLowerCase() ===
        "student"
        ? "Numéro étudiant"
        : "Numéro RPPS";
    },
    ...mapGetters({
      user: "connectedUser",
      pharmacistData: "pharmacistData"
    })
  },
  methods: {
    format(date) {
      return moment(date)
        .locale("fr")
        .format("Do MMMM YYYY");
    }
  }
};
</script>
