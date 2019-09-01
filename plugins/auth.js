export default function({ app, $axios }, inject) {
  // IOT use $auth which will contains auth methods
  // inject in the global scope several function use to authenticate
  inject("auth", {
    /**
     *
     * @param {string} email
     * @param {string} password
     * @returns {*}
     */
    login: (email, password) => $axios.post(`/login`, { email, password }),

    /**
     *
     * @param {object} payload
     * @returns {*}
     */
    registerPatient: payload => $axios.post("/register/basic", payload),

    /**
     *
     * @param {object} payload
     * @returns {*}
     */
    registerPharmacist: payload => $axios.post("/register/pharmacist", payload),

    /**
     *
     * @param {string} token
     * @returns {Promise<*>}
     */
    activateAccount: token =>
      $axios.post(`/register/account-activation/${token}`),

    /**
     *
     * @param {string} email
     * @returns {Promise<*>}
     */
    resendActivationMail: email =>
      $axios.post("/register/resend-activation-mail", { email }),

    /**
     *
     * @param {string} email
     * @returns {Promise<*>}
     */
    passwordForgotten: email =>
      $axios.put("/forgot-password/send-mail", { email }),

    checkResetPasswordToken: token =>
      $axios.get(`/forgot-password/verify-token/${token}`),

    /**
     *
     * @param {string} token
     * @param {string} password
     * @returns {Promise<*>}
     */
    updatePassword: (token, password) =>
      $axios.put(`/forgot-password/reset/${token}`, { password })
  });

  inject("account", {
    update: (id, payload) => $axios.put(`/accounts/${id}`, payload)
  });
}
