<template>
  <div>
    <v-img
      src="/contact-pharmacist.jpg"
      aspect-ratio="2.35"
      gradient="to top right, rgba(150,150,150,0.12), rgba(220,230,130,.14)"
    >
      <v-container bg fluid fill-height>
        <v-layout row wrap align-center>
          <div class="content-center title-main">
            <span class="title-section-huge blue-grey--text text--darken-4"
              >Contacter un pharmacien</span
            >
            <hr class="divider divider-large mt-3 blue-grey darken-4" />
          </div>
        </v-layout>
      </v-container>
    </v-img>
    <v-container fluid class="px-4 pt-3">
      <v-layout row wrap>
        <v-flex offset-xs2 xs8 offset-sm2 sm4>
          <v-text-field
            color="transparent"
            placeholder="Bientôt la possibilité de rechercher un pharmacien..."
            box
            disabled
            flat
            solo
          ></v-text-field>
        </v-flex>
        <v-flex
          v-for="pharmacist in pharmacists"
          offset-sm1
          sm10
          offset-md2
          md6
          :key="pharmacist.id"
          mb-4
        >
          <pharmacist-card
            :address="pharmacist.address"
            :first-name="pharmacist.firstName"
            :image="pharmacist.image"
            :last-name="pharmacist.lastName"
            :workplace="pharmacist.workplace"
            :identifiant="pharmacist.id"
            @pharmacist-card::contact="contactPharmacist"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PharmacistCard from "../components/pharmacist/PharmacistCard";
export default {
  name: "Contacter-Un-Pharmacien",
  components: { PharmacistCard },
  data() {
    return {
      pharmacists: [
        {
          id: 1234,
          firstName: "Michel",
          lastName: "Simons",
          address: "127, avenue de Toulouse",
          workplace: "D.U PlanetArium",
          image:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          id: 123,
          firstName: "John",
          lastName: "Fitzpatrick",
          address: "Somewhere",
          workplace: "D.U PlanetArium",
          image: null
        }
      ]
    };
  },

  methods: {
    contactPharmacist(id) {
      // if not connected show connection dialog
      console.log(id);
    }
  }
};
</script>

<style scoped></style>
