<template>
  <v-app light>
    <admin-nav-bar />
    <snack-bar />
    <v-content>
      <nuxt />
    </v-content>
    <admin-button />
  </v-app>
</template>

<script>
import AdminButton from "../components/layout/AdminButton";
import AdminNavBar from "../components/layout/AdminNavBar";
import SnackBar from "../components/layout/SnackBar";
export default {
  name: "admin",
  middleware: "admin",
  components: { SnackBar, AdminNavBar, AdminButton }
};
</script>
