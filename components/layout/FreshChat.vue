<template>
  <div>
    <script v-if="showFreshChat()"></script>
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
    }
  },
  methods: {
    showFreshChat() {
      //&& !this.$route.path.includes("/messages")
      console.log(
        "state",
        !this.$store.getters.isLoggedIn,
        this.isPatient && !this.$route.path.includes("/messages")
      );

      if (
        !this.$store.getters.isLoggedIn ||
        (this.isPatient && !this.$route.path.includes("/messages"))
      ) {
        this.initFreshChat();
        return true;
      }

      if (window.fcWidget) {
        window.fcWidget.destroy();
      }

      return false;
    },

    initFreshChat() {
      console.log("Fresh chat mounted");

      window.fcWidget.init({
        token: "567298fc-1d09-46cb-a942-12a07c45b2c2",
        host: "https://wchat.freshchat.com",
        locale: "fr",
        siteId: "blablapharmaid",

        config: {
          headerProperty: {
            appName: "BlablaPharma"
          },
          content: {
            headers: {
              chat: "Nous contacter",
              chat_help: "Contactez nous si vous avez des questions"
            }
          }
        }
        // externalId: "EXTERNAL_ID"
      });
    }
  },
  mounted() {
    console.log("Component fresh is mounted");
  }
};
</script>
