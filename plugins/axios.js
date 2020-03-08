import { LOGOUT } from "../store/types";

export default function({ $axios, store, app }) {
  // 5 second timeout
  $axios.defaults.timeout = 10000;
  $axios.interceptors.response.use(
    response => response.data,
    async e => {
      const originalRequest = e.config;
      const error = e.response ? e.response : e.request;

      const promiseError = () =>
        Promise.reject({
          status: error.status,
          error: error.data
        });

      /*
        if there is an error 401 (forbidden) on the request
        we try to refresh the token
       */

      if (
        e.response.status === 401 &&
        originalRequest.url.includes("/auth/token")
      ) {
        // there is an err
        store.dispatch(LOGOUT, {
          withRedirect: true,
          message: "Erreur veuillez vous reconnecter"
        });

        return promiseError();
      }

      if (e.response.status === 401 && !originalRequest.__isRetryRequest) {
        originalRequest.__isRetryRequest = true;

        try {
          await store.dispatch("refreshToken");
          const Authorization = `Bearer ${store.state.token}`;
          const newRequest = {
            ...originalRequest,
            headers: { Authorization },
            baseURL: "" // remove /api from the url
          };

          return $axios.request(newRequest);
        } catch (raisedError) {
          return promiseError();
        }
      }
      return promiseError();
    }
  );

  $axios.onRequest(config => {
    if (store.state.token) {
      config.headers.common["Authorization"] = `Bearer ${store.state.token}`;
    }
  });
}
