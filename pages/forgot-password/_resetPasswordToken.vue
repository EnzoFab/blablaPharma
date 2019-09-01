<template>
  <v-container fluid pt-4>
    <v-card flat color="transparent">
      <template v-if="tokenIsValid">
        <h1 class="title-main title-main-rail text--baseColor content-center">
          Mise a jour du mot de passe
        </h1>
        <v-form
          lazy-validation
          ref="updatePasswordForm"
          @submit.prevent="updatePassword"
        >
          <v-container fluid>
            <v-layout row wrap>
              <v-flex offset-xs2 xs8 pb-0 mt-4>
                <h2 class="text--section text--baseColor">
                  Entrez un nouveau mot de passe
                </h2>
              </v-flex>
              <v-flex offset-xs2 xs8>
                <password-field
                  v-model="fields.password"
                  label="Nouveau mot de passe"
                  placeholder="Nouveau mot de passe"
                />
              </v-flex>
              <v-flex offset-xs2 xs8>
                <v-text-field
                  v-model.trim="fields.confirmPassword"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :type="showPassword ? 'text' : 'password'"
                  outline
                  color="grey darken-1"
                  label="Confirmation"
                  placeholder="Confirmer le mot de passe"
                  :rules="[
                    ...$constraints.confirmationPasswordRule(fields.password),
                    ...$constraints.required
                  ]"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-flex>
              <v-flex offset-xs2 xs8>
                <v-btn
                  depressed
                  type="submit"
                  large
                  block
                  color="blue-grey lighten-1"
                  dark
                  :loading="loading"
                  >Mettre à jour mot de passe</v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-card-text
          v-show="errorMessage != null"
          class="content-center mt-0 pt-0"
        >
          <span class="red--text text--section">{{ errorMessage }}</span>
        </v-card-text>
      </template>
      <div v-else class="content-center">
        <h1 class="title-main title-main-rail text--baseColor">
          Ce lien n'est pas valide
        </h1>
        <h2 class="text--baseColor text-content mt-2">
          Votre lien n'est pas valide ou expiré
        </h2>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import to from "await-to-js";
import PasswordField from "../../components/forms/PasswordField";
export default {
  components: { PasswordField },
  middleware: "notConnected",
  data() {
    return {
      fields: { password: null, confirmPassword: null },
      showPassword: false,
      loading: false,
      errorMessage: null
    };
  },
  methods: {
    async updatePassword() {
      if (this.$refs.updatePasswordForm.validate()) {
        this.loading = true;
        this.errorMessage = null;
        try {
          const resetPasswordToken = this.$route.params.resetPasswordToken;

          await this.$store.dispatch("resetPassword", {
            resetPasswordToken,
            password: this.fields.password
          });
        } catch (e) {
          this.errorMessage =
            "Une erreur est survenue, impossible de mettre à jour le mot de passe";
        } finally {
          setTimeout(() => (this.loading = false), 1500);
        }
      }
    }
  },

  async asyncData({ app, params }) {
    const [err, result] = await to(
      app.$auth.checkResetPasswordToken(params.resetPasswordToken)
    );

    const tokenIsValid = !err && result;

    return { tokenIsValid };
  }
};
</script>
