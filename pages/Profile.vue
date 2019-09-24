<template>
  <div>
    <general-information
      v-if="!updateInformation"
      @generalinformation::updateinformation="updateGeneralInformation"
      @generalinformation::updatePharmacist="updatePharmacist"
    />
    <template v-else>
      <v-tabs v-model="currentTab" centered>
        <v-tabs-slider color="green"></v-tabs-slider>
        <v-tab v-for="tab in tabs" :key="tab.key" :href="`#${tab.key}`">{{
          tab.label
        }}</v-tab>
        <v-tabs-items>
          <v-tab-item v-for="tab in tabs" :key="tab.key" :value="tab.key">
            <v-card flat color="white" class="pa-2">
              <v-hover :disabled="$vuetify.breakpoint.smAndDown">
                <span slot-scope="{ hover }">
                  <v-btn large depressed @click="updateInformation = false" icon
                    ><v-icon large>fas fa-arrow-circle-left</v-icon></v-btn
                  >
                  <span v-if="hover || $vuetify.breakpoint">Retour</span>
                </span>
              </v-hover>

              <update-password
                v-if="tab.key === 'password'"
                :user-id="connectedUserId"
                @updatepassword::updated="handleUpdate"
                @updatepassword::error="handleError"
              />
              <update-general-information
                v-else-if="tab.key === 'general'"
                :user-id="connectedUserId"
                @updategeneralinformation::updated="handleUpdate"
                @updategeneralinformation::error="handleError"
              />
              <update-email
                v-else-if="tab.key === 'mail'"
                @updateemail::error="handleError"
                @updateemail::updated="handleUpdate"
                :user-id="connectedUserId"
              />

              <update-pharmacist-information
                @updatepharmacistinformation::error="handleError"
                @updatepharmacistinformation::updated="handleUpdate"
                v-else-if="tab.key === 'pharmacist'"
              />

              <v-card-text v-if="errorMessage" class="content-center">
                <span class="red--text">{{ errorMessage }}</span>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </template>
  </div>
</template>

<script>
import { TOGGLE_SNACKBAR } from "../store/types";
import { mapState } from "vuex";
const GeneralInformation = () =>
  import("~/components/profile/GeneralInformation");

const UpdatePassword = () => import("~/components/profile/UpdatePassword");

const UpdateGeneralInformation = () =>
  import("~/components/profile/UpdateGeneralInformation");

const UpdatePharmacistInformation = () =>
  import("~/components/profile/UpdatePharmacistInformation");

const UpdateEmail = () => import("~/components/profile/UpdateEmail");
export default {
  name: "Profile",
  head() {
    const connectedUser = this.$store.getters.connectedUser;
    const fullName = connectedUser
      ? `${connectedUser.firstName} ${connectedUser.lastName}`
      : "Profile";
    return {
      title: `${fullName}`,
      meta: [
        {
          hid: "Profile",
          name: "description",
          content: `Profil de ${fullName}, utilisateur sur BlablaPharma`
        }
      ]
    };
  },
  middleware: "connected",
  components: {
    UpdateEmail,
    UpdatePharmacistInformation,
    UpdateGeneralInformation,
    UpdatePassword,
    GeneralInformation
  },
  data() {
    return {
      updateInformation: false,
      currentTab: null,
      errorMessage: null
    };
  },
  computed: mapState({
    tabs: state => {
      const pharmacistTab = state.pharmacist
        ? [{ label: "Mis à jour pharmacien", key: "pharmacist" }]
        : [];

      return [
        { label: "Mise à jour données générales", key: "general" },
        { label: "Mise à jour mot de passe", key: "password" },
        { label: "Mise à jour adresse mail", key: "mail" },
        ...pharmacistTab
      ];
    },
    connectedUserId: state =>
      state.connectedUser ? state.connectedUser.id : null
  }),
  methods: {
    updateGeneralInformation() {
      this.updateInformation = true;
      this.currentTab = "general";
    },
    updatePharmacist() {
      this.updateInformation = true;
      this.currentTab = "pharmacist";
    },
    handleError(error) {
      this.errorMessage = error;
    },

    handleUpdate(message) {
      this.errorMessage = null;
      this.$store.commit(TOGGLE_SNACKBAR, message);
    }
  }
};
</script>
