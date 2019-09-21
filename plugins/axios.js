export default function({ $axios, store }) {
  // 5 second timeout
  $axios.defaults.timeout = 5000;
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
    //config.baseURL += `api`;
    //config.baseURL = env.BASE_URL;
    if (store.state.token) {
      config.headers.common["Authorization"] = `Bearer ${store.state.token}`;
    }
  });
}
