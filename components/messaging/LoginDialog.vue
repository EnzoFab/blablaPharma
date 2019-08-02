<template>
  <v-dialog v-model="displayDialog" min-width="400" max-width="600">
    <login-form
      @login-form:close="closeDialog"
      :custom-login-title="customTitle"
    />
  </v-dialog>
</template>

<script>
import { SET_CONNEXION_DIALOG } from "../../store/modules/types";
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
        // when the value changes
        this.$store.commit(SET_CONNEXION_DIALOG, value);
      }
    }
  },

  methods: {
    closeDialog() {
      console.log("click");
      this.$store.commit(SET_CONNEXION_DIALOG, false);
    }
  }
};
</script>

<style scoped></style>
