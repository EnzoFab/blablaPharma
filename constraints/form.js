export default {
  emailRules: [v => /.+@.+\..+/.test(v) || "E-mail non valide"],
  required: [v => !!v || "Champs requis"],
  passwordRules: [v => v.length >= 8 || "Minimum 8 charactères"]
};
