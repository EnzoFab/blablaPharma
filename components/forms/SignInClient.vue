<template>
  <v-form
    ref="signInClient"
    class="p-2"
    lazy-validation
    @submit.prevent="sendForm"
  >
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex mb-0 pb-0 xs12>
          <v-text-field
            outline
            v-model="fields.mail"
            color="grey darken-1"
            type="mail"
            label="Email"
            :rules="[...$constraints.required, ...$constraints.emailRules]"
          ></v-text-field>
        </v-flex>
        <v-flex mb-0 pb-0 sm6 xs12>
          <v-text-field
            v-model="fields.firstName"
            outline
            color="grey darken-1"
            label="Prenom"
            :rules="$constraints.required"
          ></v-text-field>
        </v-flex>
        <v-flex mb-0 pb-0 sm6 xs12>
          <v-text-field
            v-model="fields.lastName"
            outline
            color="grey darken-1"
            label="Nom"
            :rules="$constraints.required"
          ></v-text-field>
        </v-flex>
        <v-flex mb-0 pb-0 sm6 xs12>
          <v-text-field
            v-model="fields.password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            outline
            color="grey darken-1"
            label="Mot de passe"
            placeholder="Mot de passe"
            loading
            :rules="[...$constraints.passwordRules, ...$constraints.required]"
            @click:append="showPassword = !showPassword"
          >
            <template v-slot:progress>
              <v-progress-linear
                v-show="showProgressBar"
                class="mt-2"
                :value="progressBarLength"
                :color="progressBarColor"
                height="4"
              ></v-progress-linear>
            </template>
          </v-text-field>
        </v-flex>
        <v-flex sm6 xs12 mb-0 pb-0>
          <v-text-field
            v-model="fields.confirmPassword"
            :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
            :type="showPassword2 ? 'text' : 'password'"
            outline
            color="grey darken-1"
            label="Confirmation"
            placeholder="Confirmer le mot de passe"
            :rules="[
              ...$constraints.confirmationPasswordRule(fields.password),
              ...$constraints.required
            ]"
            @click:append="showPassword2 = !showPassword2"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 mt-0 pt-0>
          <v-radio-group
            row
            v-model="fields.sex"
            label="Sexe:"
            class="ml-5"
            mandatory
            :rules="$constraints.required"
          >
            <v-radio
              class="ml-5 pl-5 mr-4"
              color="light-grey"
              label="Homme"
              value="man"
            ></v-radio>
            <v-radio
              class="mr-4"
              color="light-grey"
              label="Femme"
              value="woman"
            ></v-radio>
            <v-radio color="light-grey" label="Autre" value="other"></v-radio>
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
              v-model="fields.birthday"
              :max="maxDate"
              locale="fr-Fr"
              color="blue-grey lighten-1"
              min="1950-01-01"
              reactive
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
        <v-flex mb-0 pb-0 xs12 class="content-center">
          <v-btn
            depressed
            type="submit"
            large
            block
            color="blue-grey lighten-1"
            dark
            :loading="loading"
            >{{ submitButtonText }}</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import moment from "moment";
export default {
  name: "SignInClient",
  props: {
    submitButtonText: { type: String, default: "S'inscrire" },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      showMenu: false,
      showPassword: false,
      showPassword2: false,
      fields: {
        mail: null,
        firstName: null,
        lastName: null,
        sex: null,
        password: null,
        confirmPassword: null,
        birthday: null
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
    showProgressBar() {
      const pwd = this.fields.password;
      return pwd && pwd.length > 0;
    },

    progressBarColor() {
      const pwd = this.fields.password || "";

      if (pwd.length <= 3) {
        return "red";
      }

      if (pwd.length <= 5) {
        return "orange";
      }

      if (pwd.length <= 7) {
        return "yellow";
      }

      if (pwd.length <= 10) {
        return "light-green accent-1";
      }

      return "light-green accent-3";
    },

    progressBarLength() {
      const pwd = this.fields.password;

      if (!pwd || pwd.length === 0) {
        return 0;
      }
      const length = (pwd.length * 100) / 12;

      return length < 100 ? length : 100;
    },

    dateFr() {
      return this.fields.birthday
        ? moment(this.fields.birthday)
            .locale("fr")
            .format("Do MMMM YYYY")
        : "";
    },

    maxDate() {
      return moment()
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
        this.$emit("signin-client::submit", { personalData: this.fields });
      }
    }
  }
};
</script>
