export default function({ $axios, store }) {
  // 5 second timeout
  $axios.defaults.timeout = 10000;
  $axios.interceptors.response.use(
    response => response.data,
    e => {
      const error = e.response ? e.response : e.request;

      return Promise.reject({
        status: error.status,
        error: error.data
      });
    }
  );

  $axios.onRequest(config => {
    if (store.state.token) {
      config.headers.common["Authorization"] = `Bearer ${store.state.token}`;
    }
  });
}
