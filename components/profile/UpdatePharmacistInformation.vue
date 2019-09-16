<template>
  <v-form
    lazy-validation
    ref="updatePharmacistInformationForm"
    @submit.prevent="updateInformation"
  >
    <div
      v-if="!pharmacistData.verified"
      class="content-center title-section-small text--baseColor"
    >
      <v-icon>warning</v-icon> Votre identifiant professionnel n'a pas encore
      été validé
    </div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex offset-xs2 xs8>
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
        <v-flex offset-xs2 xs8>
          <v-text-field
            v-model.trim="fields.professionalId"
            :hint="hintProfessionalId"
            :persistent-hint="pharmacistData.verified"
            color="light-grey"
            outline
            :disabled="pharmacistData.verified"
            placeholder="Numéro RPPS ou numéro etudiant"
            label="Identifiant professionnel"
            :rules="$constraints.rppsRules"
          ></v-text-field>
        </v-flex>
        <v-flex offset-md2 md3 offset-sm2 sm8>
          <v-text-field
            v-model="fields.postalCode"
            type="number"
            color="light-grey"
            label="Code postal"
            hint="Code postal de la pharmacie ou de la faculté. ex: '34000'"
            outline
            :rules="[...$constraints.required, ...$constraints.postalCodeRules]"
          ></v-text-field>
        </v-flex>
        <v-flex md5 :offset-sm2="$vuetify.breakpoint.smAndDown" sm8>
          <v-text-field
            v-model.trim="fields.city"
            color="light-grey"
            label="Ville"
            hint="Ville de la pharmacie ou de la faculté. Exemple: 'Montpellier'"
            outline
            :rules="$constraints.required"
          ></v-text-field>
        </v-flex>
        <v-flex offset-xs2 xs8>
          <v-text-field
            v-model.trim="fields.address"
            color="light-grey"
            label="Adresse professionnelle"
            hint="Adresse de la pharmacie ou de la faculté. Exemple: '120, rue des lilas'"
            outline
            :rules="$constraints.required"
          ></v-text-field>
        </v-flex>
        <v-flex offset-xs2 xs8>
          <v-text-field
            v-model.trim="fields.institutionName"
            outline
            label="Nom de l'établissement"
            hint="Nom de l'établissement où vous travaillez"
            color="light-grey"
            :rules="$constraints.required"
          ></v-text-field>
        </v-flex>
        <v-flex pt-0 mt-0 offset-md4 md4 offset-sm2 sm8 class="content-center">
          <v-btn
            large
            block
            depressed
            type="submit"
            color="blue-grey lighten-1"
            dark
            >Mettre à jour
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import to from "await-to-js";
import { mapGetters } from "vuex";
export default {
  name: "UpdatePharmacistInformation",
  data() {
    return {
      fields: {
        address: null,
        postalCode: null,
        city: null,
        institutionName: null,
        professionalId: null,
        professionLabel: null
      },
      professions: [
        { label: "Pharmacien", value: "pharmacist" },
        { label: "Etudiant", value: "student" },
        { label: "Pharmacien blablapharma", value: "pharmacistBlablapharma" }
      ]
    };
  },
  computed: {
    ...mapGetters(["pharmacistData"]),
    hintProfessionalId() {
      return this.pharmacistData.verified
        ? "Votre idenfiant professionnel a été validé, il n'est plus modifiable"
        : "11 charactères";
    }
  },
  methods: {
    async updateInformation() {
      if (this.$refs.updatePharmacistInformationForm.validate()) {
        const [e, res] = await to(
          this.$pharmacist.update(this.pharmacistData.id, this.fields)
        );

        if (e) {
          this.$emit(
            "updatepharmacistinformation::error",
            "Une erreur est survenue, impossible de mettre à jour les informations"
          );
        }

        if (!e && res) {
          this.$emit(
            "updatepharmacistinformation::updated",
            "Les informations ont été mises à jour avec succès"
          );
          this.$store.dispatch("updatePharmacist", res);
        }
      }
    }
  },
  mounted() {
    this.fields = { ...this.pharmacistData };
    delete this.fields.verified;
  }
};
</script>
