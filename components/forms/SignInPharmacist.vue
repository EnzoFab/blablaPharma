<template>
  <v-stepper v-model="step" class="elevation-0 mb-0 pb-0">
    <v-stepper-header class="elevation-0 mb-0 pb-0">
      <v-stepper-step editable :complete="step !== 1" color="orange" step="1"
        >Informations personnelles</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step color="orange" step="2"
        >Informations professionnelles</v-stepper-step
      >
    </v-stepper-header>
    <v-stepper-items class="elevation-0 mt-0 pt-0">
      <v-stepper-content step="1">
        <sign-in-client
          submit-button-text="Suivant"
          @signin-client::submit="nextStep"
        />
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-form
          ref="professionalForm"
          lazy-validation
          @submit.prevent="register"
        >
          <v-container fluid>
            <v-layout row wrap align-center>
              <v-flex xs12>
                <v-select
                  v-model="fields.professionLabel"
                  outline
                  flat
                  label="Profession"
                  item-text="label"
                  item-value="value"
                  color="light-grey"
                  :items="professions"
                  :rules="$constraints.required"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model.trim="fields.professionalId"
                  hint="Numéro RPPS ou numero etudiant"
                  color="light-grey"
                  outline
                  label="Identifiant professionnel"
                  :rules="$constraints.rppsRules"
                ></v-text-field>
              </v-flex>
              <v-flex sm4 xs12>
                <v-text-field
                  v-model="fields.postalCode"
                  type="number"
                  color="light-grey"
                  label="Code postal"
                  hint="Code postal de la pharmacie ou de la faculté. ex: '34000'"
                  outline
                  :rules="[
                    ...$constraints.required,
                    ...$constraints.postalCodeRules
                  ]"
                ></v-text-field>
              </v-flex>
              <v-flex sm7 offset-sm1 xs12>
                <count-text-field
                  v-model="fields.city"
                  hint="Ville de la pharmacie ou de la faculté. Exemple: 'Montpellier'"
                  label="Ville"
                  :max-length="50"
                  required
                  trim
                />
              </v-flex>
              <v-flex xs12>
                <count-text-field
                  v-model="fields.address"
                  hint="Adresse de la pharmacie ou de la faculté. Exemple: '120, rue des lilas'"
                  label="Adresse professionnelle"
                  :max-length="100"
                  required
                  trim
                />
              </v-flex>
              <v-flex xs12>
                <count-text-field
                  v-model="fields.institutionName"
                  hint="Nom de l'établissement où vous travaillez"
                  label="Nom de l'établissement"
                  :max-length="50"
                  required
                  trim
                />
              </v-flex>
              <v-flex xs12 class="content-center" v-if="errorMessage">
                <span class="red--text text--lighten-2">{{
                  errorMessage
                }}</span>
              </v-flex>
              <v-flex xs12 class="content-center">
                <v-btn
                  large
                  block
                  color="default-grey"
                  dark
                  depressed
                  :loading="loading"
                  type="submit"
                  >S'inscrire</v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
const SignInClient = () => import("./SignInClient");
const CountTextField = () => import("./CountTextField");
export default {
  name: "SignInPharmacist",
  components: { CountTextField, SignInClient },
  props: {
    loading: { type: Boolean, default: false },
    errorMessage: String
  },
  data() {
    return {
      step: 1,
      fields: {
        address: null,
        postalCode: null,
        city: null,
        institutionName: null,
        professionalId: null,
        professionLabel: "pharmacist"
      },
      personalData: null,
      professions: [
        { label: "Pharmacien", value: "pharmacist" },
        { label: "Etudiant", value: "student" },
        { label: "Pharmacien blablapharma", value: "pharmacistBlablapharma" }
      ]
    };
  },
  methods: {
    nextStep(data) {
      this.personalData = data;
      this.step++;
    },

    register() {
      if (this.$refs.professionalForm.validate()) {
        this.$emit("signin-pharmacist::register", {
          professionalData: this.fields,
          ...this.personalData
        });
      }
    }
  }
};
</script>
