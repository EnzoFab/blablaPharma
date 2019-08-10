const BASE_URL = "/auth/";

export default function({ app, $axios }, inject) {
  // IOT use $auth which will contains auth methods
  inject("auth", {
    // $auth.login
    login(mail, password) {
      return $axios.post(`${BASE_URL}login`, { mail, password });
    },

    registerUser() {},

    registerPharmacist() {}
  });
}
