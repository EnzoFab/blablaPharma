<template>
  <v-dialog v-model="toggleDialog" full-width>
    <v-card flat color="white" class="content-center" tile>
      <v-icon
        color="default-grey"
        class="pt-2"
        :size="30"
        @click="$emit('input', false)"
        >close</v-icon
      >
      <v-container fluid fill-height grid-list-sm>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 v-for="column in columns" :key="column.title">
            <div class="text-xs-center">
              <v-avatar tile size="130">
                <v-img
                  :src="iconFullPath(column.icon)"
                  :alt="column.icon"
                ></v-img>
              </v-avatar>
            </div>
            <div class="text-xs-center">
              <h2 class="title-section text--baseColor">
                {{ column.title }}
              </h2>
              <div class="text--baseColor text--section mt-3">
                {{ column.text }}
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HowItWorksDialog",
  props: {
    value: Boolean
  },
  data() {
    return {
      columns: [
        {
          icon: "1.png",
          title: "Inscrivez-vous",
          text: "Complétez le formulaire en ligne pour vous connecter"
        },
        {
          icon: "2.png",
          title: "Recherchez un pharmacien",
          text:
            "Recherchez votre pharmacien dans la liste ou sélectionnez un pharmacien BlaBlaPHARMA présent 24/24"
        },
        {
          icon: "3.png",
          title: "Commencez",
          text:
            "Posez votre question au pharmacien en donnant le maximum de détails"
        },
        {
          icon: "4.png",
          title: "Chattez",
          text:
            "Recevez des informations et conseils fiables comme à la pharmacie"
        }
      ]
    };
  },
  computed: {
    toggleDialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      }
    }
  },
  methods: {
    iconFullPath(icon) {
      return `/images/how-it-works-icon-${icon}`;
    }
  }
};
</script>
