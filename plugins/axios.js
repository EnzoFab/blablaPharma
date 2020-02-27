import to from "await-to-js";
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

      if (e.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = store.state.refreshToken;

        const [err, res] = await to(app.$auth.refreshToken(refreshToken));

        if (err) {
          return promiseError();
        }

        console.log(res);
        store.dispatch("refreshToken", res);

        return $axios(originalRequest);
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
