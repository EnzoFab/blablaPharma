const BASE_URL = "/auth/";

export default function({ app, $axios }, inject) {
  inject("auth", {
    login(mail, password) {
      return $axios.post(`${BASE_URL}login`, { mail, password });
    },

    registerUser() {},

    registerPharmacist() {}
  });
}
