<template>
  <v-form lazy-validation ref="updateEmailForm" @submit.prevent="updateEmail">
    <v-container fluid>
      <div v-if="newEmail" class="content-center text--baseColor">
        <v-icon size="20" color="grey">warning</v-icon> {{ newEmail }} est en
        attente de confirmation
      </div>
      <div class="content-center">
        <v-alert v-model="showAlert" outline type="warning">
          Vous avez une adresse mail à valider, voulez-vous quand même modifier
          cette adresse ?
          <div>
            <v-btn outline small color="orange" @click="allowUpdateMail"
              >Oui</v-btn
            >
            <v-btn outline small color="orange" @click="showAlert = false"
              >Non</v-btn
            >
          </div>
        </v-alert>
      </div>

      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-text-field
            v-model="fields.newEmail"
            outline
            label="Nouveau email"
            type="mail"
            :placeholder="placeholder"
            :readonly="newEmail && readOnly"
            :rules="$constraints.emailRules"
            @click="handleClick"
          ></v-text-field>
          <v-flex offset-xs3 xs6>
            <v-btn
              :disabled="newEmail && fields.newEmail === newEmail"
              large
              block
              depressed
              type="submit"
              color="blue-grey lighten-1"
              dark
              >Mettre à jour</v-btn
            >
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import get from "lodash.get";
import to from "await-to-js";
export default {
  name: "UpdateEmail",
  props: ["userId"],
  data() {
    return {
      fields: {
        newEmail: this.newEmail
      },
      readOnly: true,
      showAlert: false
    };
  },
  computed: {
    connectedUser() {
      return this.$store.getters.connectedUser;
    },
    newEmail() {
      return get(this.connectedUser, "newEmail", null);
    },
    placeholder() {
      return this.newEmail ? this.newEmail : this.connectedUser.email;
    }
  },

  methods: {
    async updateEmail() {
      if (
        this.$refs.updateEmailForm.validate() &&
        this.newEmail &&
        this.fields.newEmail !== this.newEmail
      ) {
        const [e, res] = await to(
          this.$account.update(this.userId, this.fields)
        );
        if (e) {
          this.$emit(
            "updateemail::error",
            "Une erreur est survenue, impossible de mettre à jour les informations"
          );
        }

        if (!e && res) {
          this.$emit(
            "updateemail::updated",
            "Les informations ont été mises à jour avec succès"
          );
          this.$store.dispatch("updateAccount", res);
        }
      }
    },

    handleClick() {
      //this.readOnly = this.newEmail === null;
      this.showAlert = this.newEmail !== null && this.readOnly;
    },

    allowUpdateMail() {
      this.showAlert = false;
      this.readOnly = false;
    }
  }
};
</script>
