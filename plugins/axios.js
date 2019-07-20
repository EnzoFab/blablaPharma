export default function({ $axios, store, env }) {
  $axios.onRequest(config => {
    /* if (store.state.token) {
      config.headers.common["Authorization"] = `Bearer ${
        store.getters["auth/token"]
      }`;
    } */
    // todo add access token
  });
}
