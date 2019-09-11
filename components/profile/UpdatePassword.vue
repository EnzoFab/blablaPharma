<template>
  <v-form
    lazy-validation
    ref="updatePasswordForm"
    @submit.prevent="updatePassword"
  >
    <v-container fluid>
      <v-layout row wrap>
        <v-flex offset-xs2 xs8>
          <v-text-field
            v-model="fields.oldPassword"
            outline
            color="grey darken-1"
            label="Ancien mot de passe"
            placeholder="Ancien mot de passe"
            :rules="$constraints.required"
            @click:append="showOldPassword = !showOldPassword"
            :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
            :type="showOldPassword ? 'text' : 'password'"
          ></v-text-field>
        </v-flex>
        <v-flex offset-xs2 xs8>
          <password-field
            v-model="fields.newPassword"
            label="Nouveau mot de passe"
            placeholder="Nouveau mot de passe"
          />
        </v-flex>
        <v-flex pb-0 mb-0 offset-xs2 xs8>
          <v-text-field
            outline
            v-model="fields.confirmPassword"
            label="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
            :rules="$constraints.confirmationPasswordRule(fields.newPassword)"
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
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
            >Modifier mot de passe
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import to from "await-to-js";
import PasswordField from "../forms/PasswordField";
export default {
  name: "UpdatePassword",
  components: { PasswordField },
  props: ["userId"],
  data() {
    return {
      showMenu: false,
      fields: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      },
      showPassword: false,
      showOldPassword: false
    };
  },
  methods: {
    async updatePassword() {
      if (this.$refs.updatePasswordForm.validate()) {
        const [e, res] = await to(
          this.$account.update(this.userId, this.fields)
        );

        if (e) {
          const errorMessage =
            e.status === 403
              ? "Mauvais mot de passe, les informations n'ont pas été mises à jour"
              : "Une erreur est survenue impossible de mettre à jour les informations. Veuillez réssayer plus tard";
          this.$emit("updatepassword::error", errorMessage);
        }

        if (!e && res) {
          this.$emit(
            "updatepassword::updated",
            "Mot de passe mis à jour avec succcès"
          );
        }
      }
    }
  }
};
</script>
