<template>
  <v-form
    ref="signInClient"
    class="p-2"
    lazy-validation
    @submit.prevent="sendForm"
  >
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs4 class="content-center">
          <button
            v-if="!fields.picture"
            class="no-outline"
            @click.prevent="$refs.photo.click()"
          >
            <v-icon large color="black">photo_camera</v-icon>
            <span class="text-content text--baseColor">
              Ajouter une photo
            </span>
          </button>
          <div v-else>
            <v-badge color="red">
              <template v-slot:badge
                ><v-icon @click="resetImage" dark>close</v-icon></template
              >
              <v-avatar size="100" class="mb-3">
                <v-img
                  aspect-ratio="3.75"
                  :src="filePreview"
                  alt="Preview image"
                ></v-img>
              </v-avatar>
            </v-badge>
            <div class="text-content text--baseColor">
              Attention une image importante peut rendre l'inscription plus
              longue
            </div>
          </div>

          <input
            v-show="false"
            type="file"
            ref="photo"
            accept="image/*"
            tabindex="-1"
            @change="loadImage"
          />
        </v-flex>
        <v-flex mb-0 pb-0 xs12>
          <v-text-field
            outline
            v-model="fields.email"
            color="grey darken-1"
            type="mail"
            label="Email"
            :rules="[...$constraints.required, ...$constraints.emailRules]"
          ></v-text-field>
        </v-flex>
        <v-flex mb-0 pb-0 sm6 xs12>
          <count-text-field
            v-model="fields.firstName"
            label="Prenom"
            :max-length="20"
            required
            trim
          />
        </v-flex>
        <v-flex mb-0 pb-0 sm6 xs12>
          <count-text-field
            v-model="fields.lastName"
            label="Nom"
            :max-length="20"
            required
            trim
          />
        </v-flex>
        <v-flex mb-0 pb-0 sm6 xs12>
          <password-field v-model="fields.password" />
        </v-flex>
        <v-flex sm6 xs12 mb-0 pb-0>
          <v-text-field
            v-model.trim="fields.confirmPassword"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            outline
            color="grey darken-1"
            label="Confirmation"
            placeholder="Confirmer le mot de passe"
            :rules="[
              ...$constraints.confirmationPasswordRule(fields.password),
              ...$constraints.required
            ]"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 mt-0 pt-0>
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
            <v-radio color="light-grey" label="Autre" value="another"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex mb-0 pb-0 xs12>
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
              color="blue-grey lighten-1"
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
        <v-flex xs12 class="content-center" v-if="errorMessage">
          <span class="red--text text--lighten-2">{{ errorMessage }}</span>
        </v-flex>
        <v-flex mb-0 pb-0 xs12 class="content-center">
          <v-btn
            depressed
            type="submit"
            large
            block
            color="default-grey"
            dark
            :loading="loading"
            >{{ submitButtonText }}</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
    <alert
      v-model="showDialog"
      :text="'La taille des images ne doit pas excéder 2mo'"
    />
  </v-form>
</template>

<script>
import { FILE_MAXIMUM_SIZE } from "../../helpers";

const Alert = () => import("../dialogs/Alert");
const PasswordField = () => import("./PasswordField");
const CountTextField = () => import("./CountTextField");
export default {
  name: "SignInClient",
  components: { Alert, CountTextField, PasswordField },
  props: {
    submitButtonText: { type: String, default: "S'inscrire" },
    loading: { type: Boolean, default: false },
    errorMessage: String
  },
  data() {
    return {
      showMenu: false,
      showPassword: false,
      showDialog: false,
      filePreview: null,
      fields: {
        email: null,
        firstName: null,
        lastName: null,
        gender: null,
        password: null,
        confirmPassword: null,
        birthDayDate: null,
        picture: null
      }
    };
  },
  computed: {
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
    saveBirthDay(date) {
      this.$refs.menu.save(date);
    },
    sendForm() {
      if (this.$refs.signInClient.validate()) {
        this.fields.email = this.fields.email.toLocaleLowerCase();
        this.$emit("signin-client::submit", { personalData: this.fields });
      }
    },
    loadImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        this.resetImage();
        return;
      }

      if (file.size > FILE_MAXIMUM_SIZE) {
        this.showDialog = true;
        return;
      }

      // only accept image
      this.fields.picture = file;
      this.filePreview = URL.createObjectURL(file);
    },
    resetImage() {
      this.filePreview = null;
      this.fields.picture = null;
    }
  }
};
</script>
