<template>
  <v-container fluid pt-4>
    <v-layout row wrap>
      <v-flex pt-1 xs12>
        <h1 class="content-center text--baseColor">
          Gestion des pharmaciens
        </h1>
      </v-flex>
      <v-flex offset-xs2 xs8>
        <pharmacist-autocomplete-field
          :verified="false"
          :activated="false"
          with-student
          @pharmacistautocompletefield::search="search"
        />
      </v-flex>

      <v-flex v-if="errorMessage" xs12 pa-2>
        <div class="content-center red--text">{{ errorMessage }}</div>
      </v-flex>
      <client-only>
        <v-flex mt-3 pa-3 xs10 offset-xs1 class="scroll-y pharmacists-holder">
          <v-flex v-if="pharmacists.length === 0" xs12>
            <h3 class="content-center text--baseColor">
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
                      <div
                        v-if="pharmacist.emailToken"
                        class="red--text font-weight-bold"
                      >
                        <v-icon color="red">warning</v-icon> Ce compte n'est pas
                        activé
                      </div>
                      <div>
                        <span class="font-weight-bold">Email : </span>
                        <span class="font-italic">{{ pharmacist.email }}</span>
                      </div>
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
                          {{ format(pharmacist.warn) }}, il a 7 jours pour
                          modifier son RPPS</span
                        >
                      </div>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-btn
                        v-if="pharmacist.emailToken"
                        block
                        depressed
                        dark
                        color="blue"
                        @click="confirmDialog(pharmacist, 'activate')"
                        >Activer le compte</v-btn
                      >
                      <v-btn
                        block
                        depressed
                        dark
                        color="default-green"
                        @click="confirmDialog(pharmacist, 'validate')"
                        >Valider inscription</v-btn
                      >
                      <v-btn
                        v-if="!pharmacist.warn && !pharmacist.emailToken"
                        block
                        depressed
                        color="orange"
                        dark
                        @click="confirmDialog(pharmacist, 'warn')"
                        >Avertissement</v-btn
                      >
                      <v-btn
                        v-if="canDeletePharmacist(pharmacist)"
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
      </client-only>
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
        <div v-else-if="confirmType === 'activate'">
          Voulez vous activer le compte de
          <b>{{ getFullName(selectedPharmacist) }}</b> ?
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
          <v-btn
            v-if="confirmType === 'validate'"
            :loading="loading"
            outline
            @click="validatePharmacist"
            color="green"
            >Valider</v-btn
          >
          <v-btn
            v-else-if="confirmType === 'activate'"
            :loading="loading"
            outline
            @click="activatePharmacistAccount"
            color="green"
            >Activer</v-btn
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
          <v-btn outline @click="dialog = false" color="blue">Annuler</v-btn>
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
  head() {
    return {
      title: "Gestion des pharmaciens",
      meta: [
        {
          hid: "manage-pharmacist",
          name: "description",
          content: "gestion des pharmaciens"
        }
      ]
    };
  },

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

    async activatePharmacistAccount() {
      this.loading = true;

      const { emailToken, id } = this.selectedPharmacist;

      const [e] = await to(this.$auth.activateAccount(emailToken));

      if (e) {
        this.errorMessage =
          "Une erreur est survenue impossible de supprimer ce pharmacien";
        this.loading = false;
        this.hideDialog();
        return;
      }

      this.pharmacists = this.pharmacists.map(pharmacist => {
        if (pharmacist.id === id) {
          // set the emailToken of the selected pharmacist to null
          return { ...pharmacist, emailToken: null };
        }

        return pharmacist;
      });

      setTimeout(() => {
        this.loading = false;
        this.hideDialog();
      }, 500);
    },
    async deletePharmacist() {
      this.loading = true;
      const id = this.selectedPharmacist.id;
      const [e, res] = await to(this.$account.delete(id));

      if (e) {
        this.errorMessage =
          "Une erreur est survenue impossible de supprimer ce pharmacien";
      }

      if (!e && res) {
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
    async warningPharmacist() {
      this.loading = true;

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

    search({ pharmacists }) {
      this.pharmacists = pharmacists;
    },

    getFullName(pharmacist) {
      return pharmacist ? `${pharmacist.firstName} ${pharmacist.lastName}` : "";
    },

    getCompleteAddress(pharmacist) {
      return `${pharmacist.institutionName} - ${pharmacist.address}, ${pharmacist.postalCode} - ${pharmacist.city}`;
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

    canDeletePharmacist(pharmacist) {
      /*returns true if the pharmacist hasno't actived his account or
        or he has not change his rpps since the warning
       */
      const date = pharmacist.warn;
      return (
        pharmacist.emailToken ||
        (date &&
          this.$moment()
            .add(7, "days")
            .isSameOrBefore(this.$moment(date)))
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
    const [error, res] = await to(
      app.$pharmacist.search({
        limit: 100,
        page: 0,
        verified: false
      })
    );

    const [e, result] = await to(
      app.$pharmacist.search({
        limit: 100,
        page: 0,
        verified: false,
        activated: false
      })
    );

    const unactivatedPharmacist = !e && result ? result : [];
    const activatedPharmacist = !error && res ? res : [];

    return {
      pharmacists: [...unactivatedPharmacist, ...activatedPharmacist]
    };
  }
};
</script>
