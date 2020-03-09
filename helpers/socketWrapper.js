import configSocket from "./configSocket";

/**
 *
 * @param {object} io
 * @returns {{post(*=, *=): *, get(*=): *, getInstance: (function(*): *), delete(*=): *, put(*=, *=): *}|Promise<any>|Promise<void>|*}
 */
export default function wrapper(io) {
  const socketRequest = ({ config, store }) => {
    return new Promise(async (resolve, reject) => {
      const request = conf =>
        io.socket.request(conf, async (data, jwres) => {
          if (jwres.error) {
            if (jwres.statusCode !== 401) {
              reject(jwres);
              return;
            }

            try {
              await store.dispatch("refreshToken", null, { root: true });
              const token = store.rootState.token;
              const headers = token
                ? { authorization: `Bearer ${token}` }
                : undefined;
              const newConf = { ...config, headers };
              io.socket.request(newConf, (d, jw) => {
                if (jw.error) {
                  reject(jw);
                  return;
                }

                resolve(d);
              });
            } catch (e) {
              reject(jwres);
            }
          } else {
            resolve(data);
          }
        });

      try {
        request(config);
      } catch (err) {
        try {
          await store.dispatch("refreshToken", null, { root: true });
          const token = store.rootState.token;
          const headers = token
            ? { authorization: `Bearer ${token}` }
            : undefined;
          const newConf = { ...config, headers };
          request(newConf);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }
    });
  };
  //Promise.promisify(io.socket.request);
  return {
    socketInstance: io.socket,
    get(state, route) {
      return socketRequest(configSocket(state)("get", route));
    },
    post(state, route, data) {
      return socketRequest(configSocket(state)("post", route, data));
    },
    put(state, route, data) {
      return socketRequest(configSocket(state)("put", route, data));
    },
    delete(state, route) {
      return socketRequest(configSocket(state)("delete", route));
    }
  };
}
