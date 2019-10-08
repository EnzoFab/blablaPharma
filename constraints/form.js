export default {
  rppsRules: [
    //  v => (v && v.length === 11) || "11 charactères attendu",
    v =>
      /^(([0-9]{10}[A-z])|([0-9]{9}[A-z]{2})|([0-9]{11}))$/.test(v) ||
      "L'identifiant rentré ne correspond pas à un RPPS ou un numéro étudiant"
  ],
  emailRules: [v => /.+@.+\..+/.test(v) || "E-mail non valide"],
  required: [
    v => !!v || "Champs requis",
    v => (typeof v === "string" ? v.trim().length > 0 || "Champs requis" : true)
  ],
  passwordRules: [
    v => (v && v.length >= 8) || "Minimum 8 charactères",
    v => /[A-Z]+/.test(v) || "Le mot de passe doit avoir une majuscule",
    v => /[a-z]+/.test(v) || "Le mot de passe doit avoir une minuscule",
    v => /[0-9]+/.test(v) || "Le mot de passe doit avoir un chiffre",
    v =>
      /[*@!#%&()[\]^~\\|$?`='"{}€£/_-]+/.test(v) ||
      "Le mot de passe doit contenir au moins un charactère spécial"
  ],
  confirmationPasswordRule: firstPassword => [
    v => v === firstPassword || "les deux mots de passes sont différents"
  ],
  postalCodeRules: [v => /[0-9]{5}/.test(v) || "Code postal non valide"],
  maxLength: length => [
    v => (v && v.length <= length) || `${length} charactères maximum`
  ]
};
