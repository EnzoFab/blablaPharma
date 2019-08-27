export default function({ app, $axios }, inject) {
  // IOT use $auth which will contains auth methods
  // inject in the global scope several function use to authenticate
  inject("auth", {
    // $auth.login
    login: (email, password) => $axios.post(`/login`, { email, password }),
    registerPatient: payload => $axios.post("/register/basic", payload),
    registerPharmacist: payload => $axios.post("/register/pharmacist", payload),
    activateAccount: token => $axios.post(`/account-activation`, { token }),
    resendActivationMail: email =>
      $axios.post("/register/resend-activation-mail", { email })
  });
}
