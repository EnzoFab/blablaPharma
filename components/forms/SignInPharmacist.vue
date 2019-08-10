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
              <v-flex xs4 class="content-center">
                <button
                  v-if="!previewImageUrl"
                  class="no-outline"
                  @click.prevent="$refs.photo.click()"
                >
                  <v-icon large color="black">photo_camera</v-icon>
                  <div class="text-content text--baseColor">
                    Ajouter une photo
                  </div>
                </button>
                <v-badge v-else color="red">
                  <template v-slot:badge
                    ><v-icon @click="resetImage" dark>close</v-icon></template
                  >
                  <v-avatar size="100" class="mb-3">
                    <v-img aspect-ratio="3.75" :src="previewImageUrl"></v-img>
                  </v-avatar>
                </v-badge>

                <input
                  v-show="false"
                  type="file"
                  ref="photo"
                  accept="image/*"
                  @change="loadImage"
                />
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="fields.profession"
                  label="Profession :"
                  row
                  mandatory
                  :rules="$constraints.required"
                >
                  <v-radio
                    label="Je suis pharmacien"
                    value="pharmacist"
                    color="light-grey"
                  ></v-radio>
                  <v-radio
                    label="Je suis étudiant"
                    value="student"
                    color="light-grey"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="fields.rpps"
                  hint="Numéro RPPS ou numero etudiant"
                  color="light-grey"
                  outline
                  label="Identifiant professionnel"
                  :rules="$constraints.required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="fields.address"
                  color="light-grey"
                  label="Adresse professionnelle"
                  hint="Adresse de la pharmacie ou de la factulté"
                  outline
                  :rules="$constraints.required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="fields.workplace"
                  outline
                  label="Nom de l'établissement"
                  hint="Nom de l'établissement où vous travaillez"
                  color="light-grey"
                  :rules="$constraints.required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="content-center">
                <v-btn
                  large
                  block
                  color="blue-grey lighten-1"
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
import SignInClient from "./SignInClient";
export default {
  name: "SignInPharmacist",
  components: { SignInClient },
  props: {
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      step: 1,
      fields: {
        image: null,
        // todo use autocomplete https://v15.vuetifyjs.com/en/components/autocompletes
        address: null,
        workplace: null,
        rpps: null,
        profession: "pharmacist"
      },
      personalData: null,
      previewImageUrl: null
    };
  },
  methods: {
    nextStep(data) {
      this.personalData = data;
      this.step++;
    },
    loadImage(e) {
      const file = e.target.files[0];
      if (file.type.includes("image/")) {
        // only accept image
        this.previewImageUrl = URL.createObjectURL(file);
        this.fields.image = file;
      } else {
        this.resetImage();
      }
    },
    resetImage() {
      this.fields.image = null;
      this.previewImageUrl = null;
    },
    register() {
      if (this.$refs.professionalForm.validate) {
        this.$emit("signin-pharmacist::register", {
          ...this.personalData,
          professionalData: this.fields
        });
      }
    }
  }
};
</script>

<style scoped></style>
