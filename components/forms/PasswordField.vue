<template>
  <v-text-field
    v-model="password"
    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
    :type="showPassword ? 'text' : 'password'"
    outline
    color="grey darken-1"
    :label="label"
    :placeholder="placeholder"
    hint="Les espaces ne sont pas pris en compte"
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
</template>

<script>
export default {
  name: "PasswordField",
  props: {
    value: String,
    label: { type: String, default: () => "Mot de passe" },
    placeholder: { type: String, default: () => "Mot de passe" }
  },
  computed: {
    password: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
    showProgressBar() {
      const pwd = this.value;
      return pwd && pwd.length > 0;
    },

    progressBarColor() {
      const pwd = this.value || "";

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
      const pwd = this.value;

      if (!pwd || pwd.length === 0) {
        return 0;
      }
      const length = (pwd.length * 100) / 12;

      return length < 100 ? length : 100;
    }
  },
  data() {
    return {
      showPassword: false
    };
  }
};
</script>
