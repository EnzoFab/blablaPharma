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
            :full-address="getFullAddress(pharmacist)"
            :first-name="pharmacist.firstName"
            :image="pharmacist.picture"
            :last-name="pharmacist.lastName"
            :workplace="pharmacist.institutionName"
            :identifiant="pharmacist.professionalId"
            @pharmacist-card::contact="contactPharmacist"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <message-dialog
      :receiver-first-name="receiverFirstName"
      :receiver-last-name="receiverLastName"
      :receiver-id="receiverId"
      v-model="showDialog"
    />
  </div>
</template>

<script>
import { TOGGLE_CONNECTION_DIALOG } from "../store/types";
import PharmacistCard from "../components/pharmacist/PharmacistCard";
import MessageDialog from "../components/messaging/MessageDialog";
export default {
  name: "Contacter-Un-Pharmacien",
  components: { MessageDialog, PharmacistCard },
  data() {
    return {
      receiverId: null,
      receiverFirstName: null,
      receiverLastName: null,
      showDialog: false
    };
  },

  methods: {
    contactPharmacist({ id, firstName, lastName }) {
      // if not connected show connection dialog
      if (!this.$store.getters.isLoggedIn) {
        this.$store.commit(TOGGLE_CONNECTION_DIALOG, true);
      } else {
        this.receiverId = id;
        this.receiverFirstName = firstName;
        this.receiverLastName = lastName;
        this.showDialog = true;
      }
    },
    getFullAddress(pharmacist) {
      return `${pharmacist.address}, ${pharmacist.postalCode} ${
        pharmacist.city
      }`;
    }
  },
  /**
   * When we want to execute some request before the components is created
   * @param app
   * @returns {{pharmacists: *[]}}
   */
  asyncData({ app }) {
    return {
      // todo fetch 3 most effective pharmacist
      pharmacists: [
        {
          professionalId: 1234,
          firstName: "Michel",
          lastName: "Simons",
          postalCode: "34095",
          city: "Montpellier",
          address: "127, avenue de Toulouse",
          institutionName: "D.U PlanetArium",
          picture:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          professionalId: 123,
          firstName: "John",
          lastName: "Fitzpatrick",
          postalCode: "34000",
          city: "Anywhere",
          address: "Somewhere",
          institutionName: "D.U PlanetArium",
          picture: null
        }
      ]
    };
  }
};
</script>

<style scoped></style>
