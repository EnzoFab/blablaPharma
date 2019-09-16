<template>
  <div>
    <v-card flat>
      <div class="content-center" v-if="image">
        <v-avatar :size="size">
          <v-img aspect-ratio="2.75" :src="image"></v-img>
        </v-avatar>
      </div>

      <div class="content-center" style="background-color: #C9DB82" v-else>
        <v-avatar color="transparent" :size="size">
          <v-icon v-if="!image" :size="size" color="white"
            >person_pin</v-icon
          ></v-avatar
        >
      </div>
      <h3 class="text-xs-center pl-4 pt-2 text--baseColor title-section-huge">
        {{ fullName }}
      </h3>
      <div class="text--baseColor pl-3 pt-4">
        <span class="font-weight-bold">Sexe :</span>
        <span class="pl-2">{{ pharmacistGender }}</span>
        <div>
          <span class=" font-weight-bold ">Statut : </span>
          <span class="text-capitalize pl-2 title-section-small">
            {{ pharmacistStatus }}
          </span>
        </div>

        <div>
          <span class=" font-weight-bold ">Adresse de la pharmacie : </span>
          <span class="text-capitalize pl-2 title-section-small">
            {{ fullAddress }}
          </span>
        </div>
        <div>
          <span class="font-weight-bold ">Nom de la pharmacie : </span>
          <span class="text-capitalize pl-2 title-section-small">{{
            workplace
          }}</span>
        </div>
      </div>
      <div class="pa-1 pt-2">
        <v-btn
          block
          dark
          depressed
          large
          color="light-green lighten-1"
          @click="contact"
          >Contacter</v-btn
        >
      </div>
    </v-card>
  </div>
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
      return this.$vuetify.breakpoint.xs ? 55 : 90;
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
