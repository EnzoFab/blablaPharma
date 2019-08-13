<template>
  <div>
    <script v-if="showFreshChat"></script>
  </div>
</template>

<script>
export default {
  name: "FreshChat",
  data() {
    return {
      src: null,
      id: null,
      hide: false
    };
  },
  computed: {
    isPatient() {
      const isLoggedIn = this.$store.getters.isLoggedIn;

      return isLoggedIn && this.$store.getters.userType === "Patient";
    },
    showFreshChat() {
      if (this.isPatient) {
        this.initFreshChat();
        return true;
      }

      window.fcWidget.destroy();

      return false;
    }
  },
  methods: {
    initFreshChat() {
      window.fcWidget.init({
        token: "567298fc-1d09-46cb-a942-12a07c45b2c2",
        host: "https://wchat.freshchat.com",
        externalId: "EXTERNAL_ID"
      });
    }
  }
};
</script>
