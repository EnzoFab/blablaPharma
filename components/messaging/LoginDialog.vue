<template>
  <v-dialog v-model="displayDialog" min-width="400" max-width="600">
    <login-form
      @login-form:close="closeDialog"
      :custom-login-title="customTitle"
    />
  </v-dialog>
</template>

<script>
import { TOGGLE_CONNECTION_DIALOG } from "../../store/types";
import LoginForm from "../forms/LoginForm";

export default {
  name: "ContactPharmacistDialog",
  components: { LoginForm },
  data() {
    return {
      mail: "",
      password: "",
      formValid: true,
      isProcessing: false
    };
  },

  computed: {
    customTitle() {
      return "Connexion requise";
    },
    displayDialog: {
      get() {
        return this.$store.state.contactPharmacistDialog;
      },
      set(value) {
        // when the value changes to keep a track in the store
        this.$store.commit(TOGGLE_CONNECTION_DIALOG, value);
      }
    }
  },

  methods: {
    closeDialog() {
      this.$store.commit(TOGGLE_CONNECTION_DIALOG, false);
    }
  }
};
</script>

<style scoped></style>
