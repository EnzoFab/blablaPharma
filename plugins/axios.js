export default function({ $axios, store, env }) {
  $axios.interceptors.response.use(
    response => response.data,
    error =>
      Promise.reject({
        status: error.response.status,
        error: error.response.data
      })
  );

  $axios.onRequest(config => {
    config.baseURL += `api`;
    /* if (store.state.token) {
      config.headers.common["Authorization"] = `Bearer ${
        store.getters["auth/token"]
      }`;
    } */
    // todo add access token
  });
}
