<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="text-xs-center title-main text--baseColor">Paramètres</h1>
      </v-flex>
      <v-flex offset-xs2 xs8>
        <v-checkbox
          v-model="notificationSound"
          label="Couper le son des notifications"
        />
      </v-flex>
      <v-flex offset-xs2 xs8>
        <v-btn flat block color="error" @click="showDialog = true"
          >Supprimer le compte</v-btn
        >
      </v-flex>
    </v-layout>

    <v-dialog v-model="showDialog" max-width="550">
      <v-card flat color="white">
        <v-icon color="dark" class="mt-2 ml-2" @click="showDialog = false"
          >close</v-icon
        >
        <h2 class="title-section text--baseColor text-xs-center pb-3">
          Voulez vous vraiment supprimer votre compte ?
        </h2>
        <div class="text-xs-center text--baseColor text-content">
          Pour supprimer votre compte veuillez taper
          <span class="font-weight-bold">SUPPRIMER</span> en lettres capitales
          dans le champs de texte ci-dessous
        </div>
        <div class="px-2 pb-2">
          <v-text-field
            v-model.trim="confirmText"
            box
            flat
            hide-details
            placeholder="Nous vérifions que ce n'est pas une erreur"
          ></v-text-field>
        </div>
        <div class="text-xs-center text--baseColor text-content">
          <v-icon>warning</v-icon> Cette action est irréversible
        </div>
        <div class="px-3 pb-2">
          <v-btn
            :disabled="confirmText !== 'SUPPRIMER'"
            :loading="isLoading"
            color="error"
            dark
            depressed
            block
            large
            @click="deleteAccount"
            >supprimer</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import to from "await-to-js";
import { LOGOUT } from "../../store/types";

export default {
  name: "parameters",
  middleware: "connected",
  data() {
    return {
      showDialog: false,
      confirmText: null,
      isLoading: false
    };
  },
  computed: {
    notificationSound: {
      get() {
        return this.$store.state.chat.notificationActivated;
      },
      set(newValue) {
        this.$store.dispatch(`chat/toggleSound`, newValue);
      }
    }
  },
  methods: {
    async deleteAccount() {
      if (!this.$store.getters.isLoggedIn) {
        return;
      }
      this.isLoading = true;
      const id = this.$store.getters.connectedUser.id;
      const [e] = await to(this.$account.delete(id));

      if (e) {
        console.error(e);

        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
        return;
      }

      setTimeout(() => {
        this.showDialog = false;
        this.isLoading = false;

        this.$store.dispatch(LOGOUT, {
          withRedirect: true,
          message: "Votre compte a été supprimé avec succès"
        });
      }, 1500);
    }
  },
  watch: {
    showDialog(newValue) {
      if (!newValue) {
        this.confirmText = null;
      }
    }
  }
};
</script>
