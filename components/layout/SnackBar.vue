<template>
  <v-snackbar top left v-model="visible" class="pa-2" :timeout="4500">
    <span class="text--baseColor pa-3">{{ text }}</span>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
import { HIDE_SNACKBAR } from "../../store/types";

export default {
  name: "SnackBar",
  computed: {
    visible: {
      get() {
        return this.$store.state.snackBarVisible;
      },
      set(newValue) {
        if (!newValue) {
          this.$store.commit(HIDE_SNACKBAR);
        }
      }
    },
    ...mapState({
      text: state => state.snackbarText,
      isVisible: {
        get: state => state.snackBarVisible,
        set(value) {
          if (!value) {
            this.$store.commit(HIDE_SNACKBAR);
          }
        }
      }
    })
  }
};
</script>
