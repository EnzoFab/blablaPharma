<template>
  <div v-show="show">
    <v-speed-dial
      v-if="!adminPage"
      v-model="fab"
      bottom
      left
      fixed
      open-on-hover
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="green darken-2" dark fab large>
          <v-icon large>fas fa-user-cog</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        v-for="btn in buttons"
        fab
        dark
        medium
        nuxt
        :color="btn.color"
        :key="btn.icon"
        :to="`/bo/${btn.link}`"
      >
        <v-icon>{{ btn.icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-fab-transition v-else mode="in-out" hide-on-leave>
      <v-btn color="red" fab icon dark bottom left fixed nuxt to="/"
        ><v-icon>fas fa-sign-out-alt</v-icon></v-btn
      >
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  name: "AdminButton",
  props: [],
  data() {
    return {
      fab: false,
      buttons: [
        {
          color: "lime darken-1",
          icon: "fas fa-user-md",
          link: "manage-pharmacists"
        },
        {
          color: "default-grey darken-1",
          icon: "fas fa-newspaper",
          link: "manage-blog"
        }
      ]
    };
  },
  computed: {
    show() {
      return this.$store.getters.isAdmin;
    },
    adminPage() {
      return this.$route.path.includes("bo/");
    }
  }
};
</script>
