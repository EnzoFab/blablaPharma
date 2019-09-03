<template>
  <div>
    <v-toolbar
      :scroll-threshold="200"
      short
      fixed
      flat
      scroll-off-screen
      color="white"
      class="px-2 py-2"
    >
      <v-toolbar-title class="pl-3">
        <blablapharma-logo />
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
            >{{ item.title() }}</nuxt-link
          >
          <v-menu v-else-if="item.childs !== undefined" offset-y offset-x fixed>
            <template v-slot:activator="{ on }">
              <button
                v-on="on"
                :class="{
                  'no-outline': true,
                  'text--baseColor': true,
                  'px-4': !item.spacerBefore,
                  'pl-5': item.spacerBefore,
                  'ml-5': item.spacerBefore
                }"
              >
                {{ item.title() }}
                <v-icon size="18">keyboard_arrow_down</v-icon>
              </button>
            </template>

            <v-card flat class="pa-2">
              <div v-for="child in item.childs" :key="child.title">
                <span
                  class="text--baseColor mt-3 text-content text--lighthover content-pointer"
                  @click="child.action"
                  >{{ child.title }}</span
                >
              </div>
            </v-card>
          </v-menu>

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
            {{ item.title() }}
          </button>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import BlablapharmaLogo from "./BlablapharmaLogo";
export default {
  name: "ToolbarComputer",
  components: { BlablapharmaLogo },
  props: {
    items: Array
  }
};
</script>

<style scoped></style>
