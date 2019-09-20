import configSocket from "./configSocket";
const Promise = require("bluebird");

/**
 *
 * @param {object} io
 * @returns {{post(*=, *=): *, get(*=): *, getInstance: (function(*): *), delete(*=): *, put(*=, *=): *}|Promise<any>|Promise<void>|*}
 */
export default function wrapper(io) {
  const socketRequest = config => {
    return new Promise((resolve, reject) => {
      io.socket.request(config, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
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
