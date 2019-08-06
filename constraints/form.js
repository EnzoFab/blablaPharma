export default {
  emailRules: [v => /.+@.+\..+/.test(v) || "E-mail non valide"],
  required: [v => !!v || "Champs requis"],
  passwordRules: [
    v => (v && v.length >= 8) || "Minimum 8 charactères",
    v => /[A-Z]+/.test(v) || "Le mot de passe doit avoir une majuscule",
    v => /[a-z]+/.test(v) || "Le mot de passe doit avoir une minuscule",
    v => /[0-9]+/.test(v) || "Le mot de passe doit avoir un chiffre",
    v =>
      /[^\w\s]+/.test(v) ||
      "Le mot de passe doit contenir un charactère spécial"
  ],
  confirmationPasswordRule: firstPassword => [
    v => v === firstPassword || "les deux mots de passes sont différents"
  ]
};
