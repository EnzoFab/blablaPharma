<template>
  <v-container fluid pt-4>
    <v-layout row wrap>
      <v-flex pt-1 xs12>
        <h1 class="content-center title-main-rail text--baseColor">
          Gestion des pharmaciens
        </h1>
      </v-flex>
      <v-flex offset-xs2 xs8>
        <pharmacist-autocomplete-field
          :verified="false"
          with-student
          @pharmacistautocompletefield::search="search"
        />
      </v-flex>

      <v-flex v-if="errorMessage" xs12 pa-2>
        <div class="content-center red--text">{{ errorMessage }}</div>
      </v-flex>
      <v-flex mt-3 pa-3 xs10 offset-xs1 class="scroll-y pharmacists-holder">
        <v-flex v-if="pharmacists.length === 0" xs12>
          <h3 class="content-center text--baseColor title-main-rail">
            Aucun résultat
          </h3>
        </v-flex>
        <v-flex mb-2 v-for="pharmacist in pharmacists" :key="pharmacist.id">
          <v-card flat color="transparent" class="pa-1">
            <div class="text--baseColor pa-3" style="border: solid 1px grey">
              <div class="content-center">
                <v-avatar v-if="pharmacist.picture" size="80">
                  <v-img
                    :src="pharmacist.picture"
                    alt="Pharmacist photo"
                  ></v-img>
                </v-avatar>
              </div>
              <v-container pa-0 ma-0 fluid grid-list-xs fill-height>
                <v-layout row wrap align-center>
                  <v-flex xs12 sm8>
                    <h3 class="title-section-small mb-2">
                      {{ getFullName(pharmacist) }}
                    </h3>
                    <div>
                      <span class="font-weight-bold">RPPS : </span>
                      <span class="font-italic">{{
                        pharmacist.professionalId
                      }}</span>
                    </div>
                    <div>
                      <span class="font-weight-bold">Sexe : </span>
                      <span>{{ getGender(pharmacist) }}</span>
                    </div>
                    <div>
                      <span class="font-weight-bold">Statut : </span>
                      <span>{{ getProfession(pharmacist) }}</span>
                    </div>
                    <div>
                      <span class="font-weight-bold">Adresse : </span>
                      <span>{{ getCompleteAddress(pharmacist) }}</span>
                    </div>
                    <div>
                      <span class="font-weight-bold"
                        >Date d'inscription :
                      </span>
                      <span>{{ format(pharmacist.createdAt) }}</span>
                    </div>
                    <div v-if="pharmacist.warn" class="font-weight-bold">
                      <v-icon>warning</v-icon>
                      <span
                        >Ce pharmacien a été averti le
                        {{ format(pharmacist.warn) }}, il a 3 jours pour
                        modifier son RPPS</span
                      >
                    </div>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-btn
                      block
                      depressed
                      dark
                      color="default-green"
                      @click="confirmDialog(pharmacist, 'validate')"
                      >Valider inscription</v-btn
                    >
                    <v-btn
                      v-if="!pharmacist.warn"
                      block
                      depressed
                      color="orange"
                      dark
                      @click="confirmDialog(pharmacist, 'warn')"
                      >Avertissement</v-btn
                    >
                    <v-btn
                      v-if="canDeletePharmacist(pharmacist.warn)"
                      block
                      depressed
                      color="red"
                      dark
                      @click="confirmDialog(pharmacist, 'delete')"
                      >Supprimer</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="350">
      <v-card flat class="pa-4">
        <div
          v-if="confirmType === 'validate'"
          class="content-center text--section text--baseColor"
        >
          Voulez vous valider <b>{{ getFullName(selectedPharmacist) }}</b> ?
          <div>
            <span class="font-weight-bold"
              >RPPSS : {{ selectedPharmacist.professionalId }}</span
            >
          </div>
        </div>
        <div
          v-else-if="confirmType === 'delete'"
          class="content-center text--section text--baseColor"
        >
          Voulez vous supprimer <b>{{ getFullName(selectedPharmacist) }}</b> ?
        </div>
        <div v-else class="content-center text--section text--baseColor">
          Voulez vous avertir <b>{{ getFullName(selectedPharmacist) }}</b> ?
        </div>
        <div class="content-center">
          <v-btn outline @click="dialog = false" color="blue">Annuler</v-btn>
          <v-btn
            v-if="confirmType === 'validate'"
            :loading="loading"
            outline
            @click="validatePharmacist"
            color="green"
            >Valider</v-btn
          >
          <v-btn
            v-else-if="confirmType === 'delete'"
            :loading="loading"
            outline
            @click="deletePharmacist"
            color="red"
            >Supprimer</v-btn
          >
          <v-btn
            v-else
            :loading="loading"
            outline
            @click="warningPharmacist()"
            color="orange"
            >Avertir</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import to from "await-to-js";
import { TOGGLE_SNACKBAR } from "../../store/types";
const PharmacistAutocompleteField = () =>
  import("~/components/contact_pharmacist/PharmacistAutocompleteField");

export default {
  name: "Manage-pharmacists",
  components: { PharmacistAutocompleteField },
  layout: "admin",
  data() {
    return {
      dialog: false,
      errorMessage: null,
      selectedPharmacist: null,
      confirmType: null,
      loading: false
    };
  },
  methods: {
    hideDialog() {
      this.dialog = false;
      this.selectedPharmacist = null;
      this.confirmType = null;
    },

    async searchPharmacists() {
      this.loading = true;
      const [e, result] = await to(
        this.$pharmacist.search({ verified: false, q: this.searchWord })
      );

      if (e) {
        this.errorMessage =
          "Une erreur est survenue. Veuillez réessayer plus tard";
      }

      if (!e && result) {
        this.pharmacists = result;
      }

      setTimeout(() => (this.loading = false), 1500);
    },

    async deletePharmacist() {
      const id = this.selectedPharmacist.id;
      const [e, res] = await to(this.$account.delete(id));

      if (e) {
        this.errorMessage =
          "Une erreur est survenue impossible de supprimer ce pharmacien";
      }

      if (!e && res) {
        if (!e && result) {
          this.pharmacists = this.pharmacists.filter(
            pharmacist => pharmacist.id !== id
          );
          this.$store.commit(
            TOGGLE_SNACKBAR,
            `le compte du pharmacien: ${this.getFullName(
              this.selectedPharmacist
            )}, a bien été supprimé`
          );
        }
      }

      setTimeout(() => {
        this.loading = false;
        this.hideDialog();
      }, 1500);
    },
    async warningPharmacist() {
      const id = this.selectedPharmacist.id;
      const [e, result] = await to(this.$pharmacist.warn(id));

      if (e) {
        this.errorMessage =
          "Une erreur est survenue, impossible d'avertir cet utilisateur";
      }

      if (!e && result) {
        this.pharmacists = this.pharmacists.map(pharmacist => {
          if (pharmacist.id === id) {
            return { ...pharmacist, warn: result.warn };
          }

          return pharmacist;
        });
        this.$store.commit(
          TOGGLE_SNACKBAR,
          `le compte du pharmacien: ${this.getFullName(
            this.selectedPharmacist
          )}, a bien été averti`
        );
      }

      setTimeout(() => {
        this.loading = false;
        this.hideDialog();
      }, 1500);
    },

    async validatePharmacist() {
      this.loading = true;
      const id = this.selectedPharmacist.id;
      const payload = { ...this.selectedPharmacist, verified: true };

      const [e, result] = await to(this.$pharmacist.update(id, payload));

      if (e) {
        this.errorMessage =
          "Une erreur est survenue, impossible de valider cet utilisateur, veuillez réessayer ultérieurement";
      }

      if (!e && result) {
        this.pharmacists = this.pharmacists.filter(
          pharmacist => pharmacist.id !== id
        );
        this.$store.commit(
          TOGGLE_SNACKBAR,
          `le compte du pharmacien: ${this.getFullName(
            this.selectedPharmacist
          )}, a bien été activé`
        );
      }

      setTimeout(() => {
        this.loading = false;
        this.hideDialog();
      }, 1500);
    },

    search({ pharmacists }) {
      this.pharmacists = pharmacists;
    },

    getFullName(pharmacist) {
      return pharmacist ? `${pharmacist.firstName} ${pharmacist.lastName}` : "";
    },

    getCompleteAddress(pharmacist) {
      return `${pharmacist.institutionName} - ${pharmacist.address}, ${
        pharmacist.postalCode
      } - ${pharmacist.city}`;
    },

    getProfession(pharmacist) {
      if (pharmacist.professionLabel === "student") {
        return "Etudiant";
      }

      if (pharmacist.professionLabel === "pharmacistBlablapharma") {
        return "Pharmacien BlablaPharma";
      }

      return "Pharmacien";
    },

    getGender(pharmacist) {
      switch (pharmacist.gender) {
        case "male":
          return "Homme";
        case "female":
          return "Femme";
        default:
          return "Non renseigné";
      }
    },

    format(date) {
      return this.$moment(date).format("Do MMMM YYYY");
    },

    canDeletePharmacist(date) {
      return (
        date &&
        this.$moment()
          .add(3, "days")
          .isSameOrBefore(this.$moment(date))
      );
    },

    confirmDialog(pharmacist, confirmType) {
      this.errorMessage = null;
      this.selectedPharmacist = pharmacist;
      this.dialog = true;
      this.confirmType = confirmType;
    }
  },
  async asyncData({ app }) {
    const [e, result] = await to(
      app.$pharmacist.search({ limit: 100, page: 0, verified: false })
    );

    const pharmacists = !e && result ? result : [];

    return {
      pharmacists
    };
  }
};
</script>
