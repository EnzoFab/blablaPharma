<template>
  <v-form
    lazy-validation
    ref="updateGeneralInformationForm"
    @submit.prevent="updateInformation"
  >
    <v-container fluid grid-list-xl fill-height>
      <v-layout row wrap align-center>
        <v-flex
          md4
          :offset-xs3="$vuetify.breakpoint.smAndDown"
          xs6
          class="content-center"
        >
          <v-badge overlap color="red" v-if="fields.picture">
            <template v-slot:badge
              ><v-icon class="content-pointer" @click="resetImage" dark
                >close</v-icon
              ></template
            >
            <photo-field
              v-model="fields.picture"
              :is-pharmacist="!!pharmacistData"
            />
          </v-badge>
          <photo-field
            v-model="fields.picture"
            :is-pharmacist="!!pharmacistData"
            v-else
          />
        </v-flex>
        <v-flex md8>
          <v-container fluid pa-1 ma-0>
            <v-layout row wrap>
              <v-flex xs6 pb-0 mb-0>
                <count-text-field
                  v-model="fields.firstName"
                  label="Votre prénom"
                  placeholder="Prénom"
                  :max-length="50"
                  required
                  trim
                />
              </v-flex>
              <v-flex xs6 pb-0 mb-0>
                <count-text-field
                  v-model="fields.lastName"
                  label="Votre Nom"
                  placeholder="Nom"
                  :max-length="50"
                  required
                  trim
                />
              </v-flex>
              <v-flex offset-xs1 xs10 my-0 py-0>
                <v-radio-group
                  row
                  v-model="fields.gender"
                  label="Sexe:"
                  class="ml-5"
                  mandatory
                  :rules="$constraints.required"
                >
                  <v-radio
                    class="ml-5 pl-5 mr-4"
                    color="light-grey"
                    label="Homme"
                    value="male"
                  ></v-radio>
                  <v-radio
                    class="mr-4"
                    color="light-grey"
                    label="Femme"
                    value="female"
                  ></v-radio>
                  <v-radio
                    color="light-grey"
                    label="Autre"
                    value="another"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex mt-0 pt-0 xs12>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  lazy
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outline
                      v-model="dateFr"
                      color="light-grey"
                      label="Date de naissance"
                      prepend-icon="event"
                      readonly
                      :rules="$constraints.required"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="fields.birthDayDate"
                    :max="maxDate"
                    locale="fr-Fr"
                    color="default-grey"
                    min="1950-01-01"
                    year-icon="date_range"
                    prev-icon="skip_previous"
                    next-icon="skip_next"
                    reactive
                    full-width
                    landscape
                    @change="saveBirthDay"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex offset-md4 md4 offset-sm2 sm8 class="content-center">
          <v-btn
            block
            large
            depressed
            dark
            color="default-grey"
            type="submit"
            :loading="isLoading"
            >Mettre à jour</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import to from "await-to-js";
import { mapGetters } from "vuex";
const CountTextField = () => import("../forms/CountTextField");
const PhotoField = () => import("./PhotoField");
export default {
  name: "UpdateGeneralInformation",
  components: { CountTextField, PhotoField },
  props: ["userId"],
  data() {
    return {
      isLoading: false,
      fields: {
        firstName: null,
        lastName: null,
        picture: null,
        gender: null,
        birthDayDate: null
      }
    };
  },
  computed: {
    ...mapGetters(["connectedUser", "pharmacistData"]),
    menu: {
      get() {
        return this.showMenu;
      },
      set(val) {
        val &&
          setTimeout(() => {
            this.$refs.picker.activePicker = "YEAR";
          });
        this.showMenu = val;
      }
    },
    dateFr() {
      return this.fields.birthDayDate
        ? this.$moment(this.fields.birthDayDate).format("Do MMMM YYYY")
        : "";
    },
    maxDate() {
      // minimum 17 years ago
      return this.$moment()
        .subtract(17, "years")
        .format();
    }
  },
  methods: {
    resetImage() {
      this.fields.picture = null;
    },

    saveBirthDay(date) {
      this.$refs.menu.save(date);
    },
    async updateInformation() {
      if (
        !this.isLoading &&
        this.$refs.updateGeneralInformationForm.validate()
      ) {
        const data = { ...this.fields };

        // the picture hasn't change so we don't send it to the back
        if (data.picture === this.connectedUser.picture) {
          delete data.picture;
        }

        this.isLoading = true;
        const [e, res] = await to(this.$account.update(this.userId, data));

        setTimeout(() => {
          if (e) {
            this.$emit(
              "updategeneralinformation::error",
              "Une erreur est survenue, impossible de mettre à jour les informations"
            );
          }

          if (!e && res) {
            this.$emit(
              "updategeneralinformation::updated",
              "Les informations ont été mises à jour avec succès"
            );
            this.$store.dispatch("updateAccount", res);
          }

          this.isLoading = false;
        }, 1500);
      }
    }
  },

  mounted() {
    this.fields = { ...this.connectedUser };
    delete this.fields.email;
    delete this.fields.newEmail;
  }
};
</script>
