import wrapper from "./socketWrapper";

import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

const io = sailsIOClient(socketIOClient);

console.log("Socket url", process.env.API_URL);
/*const api_url = process.env.API_URL
  ? process.env.API_URL
  : "https://api.blablapharma.fr"; */

// io.sails.url = api_url;
// io.sails.onlyAllowOrigins = [api_url];
io.sails.transports = ["polling"];
io.sails.reconnection = true;

export const SailSocketWrapper = url => {
  const api_url = url || "https://api.blablapharma.fr";
  io.url = api_url;
  io.sails.onlyAllowOrigins = [api_url];

  return wrapper(io);
};
