<template>
  <div>
    <v-img
      src="/images/contact.jpg"
      aspect-ratio="3.15"
      gradient="to top right, rgba(255,255,255,0.25), rgba(220,230,255,.30)"
      alt="Contacter un pharmacien image de présentation"
    >
      <v-container pt-5 fill-height>
        <v-layout align-center wrap>
          <v-flex xs12>
            <div class="content-center title-main">
              <span class="title-section-huge text--baseColor"
                >CONTACTER UN PHARMACIEN</span
              >
              <hr class="divider divider-large mt-3 default-grey" />
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex offset-xs2 xs8 offset-sm2 sm6>
          <pharmacist-autocomplete-field
            @pharmacistautocompletefield::search="search"
          />
        </v-flex>
        <v-flex v-if="isLoading" xs12 class="content-center">
          <v-progress-circular
            indeterminate
            size="300"
            color="green"
          ></v-progress-circular>
        </v-flex>
        <template v-else-if="pharmacistsBlablapharma != null">
          <v-flex xs12 pb-2>
            <h2 class="text--baseColor title-section-small">
              Pharmaciens BlablaPharma
            </h2>
          </v-flex>

          <v-flex v-if="pharmacistsBlablapharma.length === 0" offset-xs2 xs8>
            <h3 class="text-xs-center text-content  text--baseColor">
              Aucun résultats
            </h3>
          </v-flex>

          <v-flex
            v-for="pharma in pharmacistsBlablapharma"
            offset-sm1
            offset-md1
            sm10
            md5
            :key="pharma.id"
          >
            <pharmacist-card
              :full-address="getFullAddress(pharma)"
              :first-name="pharma.firstName"
              :image="pharma.picture"
              :last-name="pharma.lastName"
              :workplace="pharma.institutionName"
              :identifiant="pharma.id"
              :gender="pharma.gender"
              :status="pharma.professionLabel"
              @pharmacist-card::contact="contactPharmacist"
            />
          </v-flex>
        </template>
        <v-flex xs12>
          <h2 class="text--baseColor title-section-small">Pharmaciens</h2>
        </v-flex>
        <v-flex v-if="pharmacists.length === 0" offset-xs2 xs8>
          <h3 class="text-xs-center text-content  text--baseColor">
            Aucun résultats
          </h3>
        </v-flex>

        <v-flex
          class="hidden-md-and-up"
          v-for="pharmacist in pharmacists"
          offset-sm1
          offset-md1
          sm10
          md5
          pb-4
          :key="pharmacist.id"
        >
          <pharmacist-card
            :full-address="getFullAddress(pharmacist)"
            :first-name="pharmacist.firstName"
            :image="pharmacist.picture"
            :last-name="pharmacist.lastName"
            :workplace="pharmacist.institutionName"
            :identifiant="pharmacist.id"
            :gender="pharmacist.gender"
            :status="pharmacist.professionLabel"
            @pharmacist-card::contact="contactPharmacist"
          />
        </v-flex>

        <v-container
          grid-list-xs
          fluid
          class="scroll-y pharmacists hidden-sm-and-down"
        >
          <v-layout row wrap>
            <v-flex
              v-for="pharmacist in pharmacists"
              offset-sm1
              offset-md1
              sm10
              md5
              pb-4
              :key="pharmacist.id"
            >
              <pharmacist-card
                :full-address="getFullAddress(pharmacist)"
                :first-name="pharmacist.firstName"
                :image="pharmacist.picture"
                :last-name="pharmacist.lastName"
                :workplace="pharmacist.institutionName"
                :identifiant="pharmacist.id"
                :gender="pharmacist.gender"
                :status="pharmacist.professionLabel"
                @pharmacist-card::contact="contactPharmacist"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import to from "await-to-js";
import pickBy from "lodash.pickby";
import sampleSize from "lodash.samplesize";

import { TOGGLE_CONNECTION_DIALOG, CONTACT_PHARMACIST } from "../store/types";

const PharmacistCard = () =>
  import("~/components/contact_pharmacist/PharmacistCard");
const PharmacistAutocompleteField = () =>
  import("~/components/contact_pharmacist/PharmacistAutocompleteField");
export default {
  name: "Contacter-Un-Pharmacien",
  head() {
    return {
      title: "Contacter Un Pharmacien",
      meta: [
        {
          hid: "Contacter un pharmacien",
          name: "description",
          content: "Contacter un pharmacien sur blablapharma"
        }
      ]
    };
  },

  components: { PharmacistAutocompleteField, PharmacistCard },
  data() {
    return {
      receiverId: null,
      receiverFirstName: null,
      receiverLastName: null,
      showDialog: false,
      isLoading: false
    };
  },
  methods: {
    async contactPharmacist({ id }) {
      // if not connected show connection dialog
      if (!this.$store.getters.isLoggedIn) {
        this.$store.commit(TOGGLE_CONNECTION_DIALOG, true);
        return;
      }
      try {
        const conversationId = await this.$store.dispatch(
          `chat/${CONTACT_PHARMACIST}`,
          id
        );
        this.$router.push({
          path: "/messages",
          query: { active: conversationId }
        });
      } catch (e) {
        console.error(e);
      }
    },
    getFullAddress(pharmacist) {
      return `${pharmacist.address}, ${pharmacist.postalCode}, ${
        pharmacist.city
      }`;
    },
    search({ pharmacists, filters }) {
      this.isLoading = true;
      this.pharmacists = pharmacists;

      this.$router.push({
        path: "/contacter-un-pharmacien",
        query: pickBy(filters)
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  },
  /**
   * When we want to execute some request before the components is created
   * @param app
   * @returns {{pharmacists: *[]}}
   */
  async asyncData({ app, query }) {
    // todo improve, handle query, pagination, number on page
    const [e, res] = await to(
      app.$pharmacist.search({ limit: 100, page: 0, ...query, verified: true })
    );

    const pharmacists = !e && res ? res : [];

    const [error, result] = await to(
      app.$pharmacist.search({
        professionLabel: "pharmacistBlablapharma"
      })
    );

    const pharmacistsBlablapharma = !error && result ? result : [];

    return {
      pharmacists: sampleSize(pharmacists, 10),
      pharmacistsBlablapharma: sampleSize(pharmacistsBlablapharma, 2)
    };
  }
};
</script>
