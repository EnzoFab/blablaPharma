import reduce from "lodash.reduce";
import { toFormData, buildQueryParams } from "~/helpers";

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
    registerPatient: payload => {
      const formData = toFormData(payload);
      return $axios.post("/register/basic", formData);
    },

    /**
     *
     * @param {object} payload
     * @returns {*}
     */
    registerPharmacist: payload => {
      const formData = toFormData(payload);
      return $axios.post("/register/pharmacist", formData);
    },

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
      $axios.post("/forgot-password/send-mail", { email }),

    checkResetPasswordToken: token =>
      $axios.get(`/forgot-password/verify-token/${token}`),

    /**
     *
     * @param {string} token
     * @param {string} password
     * @returns {Promise<*>}
     */
    updatePassword: (token, password) =>
      $axios.post(`/forgot-password/reset/${token}`, { password })
  });

  inject("account", {
    update: (id, payload) => {
      const formData = toFormData(payload);
      // send the formData
      return $axios.put(`/accounts/${id}`, formData);
    },
    validateNewEmail: (id, token) =>
      $axios.put(`/accounts/${id}/confirm-email/${token}`),
    delete: id => $axios.delete(`/accounts/${id}`)
  });

  inject("pharmacist", {
    search: filters => {
      const queryParams = buildQueryParams(filters, "?lite=true");

      /*  const queryParams = reduce(
        filters,
        (result, value, key) => {
          if (Array.isArray(value)) {
            const arrayQuery = value.reduce(
              (acc, val) => `${acc}&${key}=${val}`,
              ""
            );

            return `${result}&${arrayQuery}`;
          }

          return value || value === false
            ? `${result}&${key}=${value}`
            : result;
        },
        "?lite=true"
      ); */

      return $axios(`/pharmacists/search${queryParams}`);
    },
    update: (id, payload) => $axios.put(`/pharmacists/${id}`, payload),

    /**
     * Send a mail to the pharmacist to warn that is professional isn't conform
     * @param {string} id
     * @returns {Promise<*>}
     */
    warn: id => $axios.put(`/pharmacists/${id}/warn`)
  });

  inject("blog", {
    createArticle: data => {
      const formData = toFormData(data);
      return $axios.post("/articles", formData);
    },
    search: filters => {
      const queryParams = buildQueryParams(filters);
      return $axios.get(`/articles${queryParams}`);
    },
    getArticle: articleId => $axios.get(`/articles/${articleId}`),
    deleteArticle: articleId => $axios.delete(`/articles/${articleId}`)
  });
}
