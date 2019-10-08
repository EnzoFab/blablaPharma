<template>
  <no-ssr>
    <v-toolbar
      prominent
      flat
      app
      color="white"
      class="hidden-md-and-up"
      scroll-off-screen
      :scroll-threshold="200"
    >
      <v-container fluid grid-list-center fill-height>
        <v-layout row wrap align-center>
          <v-flex xs10 class="content-center">
            <blablapharma-logo />
          </v-flex>
          <v-flex xs2 class="text-xs-right">
            <v-icon x-large color="black" @click="showDialog = true"
              >menu</v-icon
            >
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog
        v-model="showDialog"
        fullscreen
        full-width
        transition
        persistent
      >
        <v-card flat class="lowOpacity">
          <v-card-text>
            <v-flex offset-xs5 xs2>
              <v-icon large @click="showDialog = false">close</v-icon>
            </v-flex>
          </v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex
                v-for="(item, index) in items"
                align-center
                xs12
                :key="index"
                class="content-center mt-3 content-pointer "
              >
                <v-expansion-panel
                  v-if="item.childs !== undefined"
                  inset
                  class="transparent mt-0 pt-0"
                >
                  <v-expansion-panel-content
                    class="transparent elevation-0 mt-0 pt-0"
                  >
                    <template v-slot:header class="mt-0 pt-0">
                      <span
                        class="text--baseColor content-center mt-0 pt-0 text-futura"
                      >
                        {{ item.title() }}
                      </span>
                    </template>
                    <v-card flat class="transparent">
                      <div
                        v-for="child in item.childs"
                        :key="child.title"
                        :class="{
                          'text--baseColor no-outline text-xs-center': true,
                          'font-weight-black text-content': isActive(child),
                          'text--section': !isActive(child)
                        }"
                      >
                        <span
                          class="text--baseColor text-futura"
                          @click="handleAction(child)"
                          >{{ child.title }}</span
                        >
                      </div>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <button
                  v-else
                  :class="{
                    'text--baseColor no-outline': true,
                    'font-weight-black text-content': isActive(item),
                    'text--section': !isActive(item)
                  }"
                  @click="handleAction(item)"
                >
                  {{ item.title() }}
                </button>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </no-ssr>
</template>

<script>
import BlablapharmaLogo from "./BlablapharmaLogo";
export default {
  name: "ToolbarMobile",
  components: { BlablapharmaLogo },
  props: {
    items: Array,
    displayToolbar: Boolean
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    isActive(item) {
      return this.$route.path === item.nuxtLink;
    },
    handleAction(item) {
      this.showDialog = false;
      // if the action isn't defined
      if (!item.action) {
        this.$router.push({
          path: item.nuxtLink
        });
      } else {
        item.action();
      }
    }
  }
};
</script>

<style scoped></style>
