<template>
  <div>
    <v-toolbar
      :scroll-threshold="200"
      app
      short
      fixed
      flat
      scroll-off-screen
      dense
      color="white"
      class="px-2 py-2 pl-5"
    >
      <v-toolbar-title class="mr-5 ml-5 pl-3">Title</v-toolbar-title>

      <v-toolbar-items>
        <template v-for="item in items">
          <nuxt-link
            v-if="item.isLink"
            :class="{
              'no-outline': true,
              'text--baseColor': true,
              'px-4': !item.spacerBefore,
              'pl-5': item.spacerBefore,
              'ml-5': item.spacerBefore
            }"
            :to="item.nuxtLink"
            tag="button"
            >{{ item.title }}</nuxt-link
          >
          <button
            v-else
            @click="item.action"
            :class="{
              'no-outline': true,
              'text--baseColor': true,
              'px-4': !item.spacerBefore,
              'pl-5': item.spacerBefore,
              'ml-5': item.spacerBefore
            }"
          >
            {{ item.title }}
          </button>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <login-form v-model="connectionDialog" />
  </div>
</template>

<script>
import LoginForm from "../forms/LoginForm";
export default {
  name: "AppNavBar",
  components: { LoginForm },
  data() {
    return {
      connectionDialog: false,
      toolbarItems: [
        {
          title: "Accueil",
          isLink: true,
          nuxtLink: "/",
          spacerBefore: false
        },
        {
          title: "Contacter un pharmacien",
          isLink: true,
          nuxtLink: "/pharmaciens",
          spacerBefore: false
        },
        {
          title: "Blog",
          isLink: true,
          nuxtLink: "/blog",
          spacerBefore: false
        },
        {
          title: "S'inscrire",
          isLink: true,
          nuxtLink: "/sign-in",
          spacerBefore: false
        },
        {
          title: "Connexion",
          spacerBefore: true,
          action: () => {
            this.connectionDialog = true;
          }
        }
      ]
    };
  },
  computed: {
    items() {
      return this.toolbarItems;
    }
  }
};
</script>

<style scoped></style>
