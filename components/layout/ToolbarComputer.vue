<template>
  <v-toolbar
    app
    fixed
    flat
    scroll-off-screen
    :scroll-threshold="200"
    color="white"
    class="pl-5 py-2 hidden-sm-and-down"
  >
    <v-spacer></v-spacer>
    <v-toolbar-title class="pl-5 ml-2">
      <blablapharma-logo />
    </v-toolbar-title>
    <v-toolbar-items>
      <template v-for="item in items">
        <nuxt-link
          v-if="item.isLink"
          :class="{
            'font-weight-bold': isActive(item.nuxtLink),
            'text--baseColor no-outline': true,
            'px-3': !item.spacerBefore
          }"
          :to="item.nuxtLink"
          tag="button"
        >
          <v-badge
            :value="item.widthBadge ? item.widthBadge() : false"
            color="default-green"
          >
            <template v-slot:badge>
              <span>!</span>
            </template>
            <span> {{ item.title() }}</span>
          </v-badge>
        </nuxt-link>
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
</template>

<script>
const BlablapharmaLogo = () => import("./BlablapharmaLogo");
export default {
  name: "ToolbarComputer",
  components: { BlablapharmaLogo },
  props: {
    items: Array
  },
  methods: {
    isActive(nuxtLink) {
      return this.$route.path === nuxtLink;
    }
  }
};
</script>
