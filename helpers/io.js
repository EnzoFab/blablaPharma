import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

const io = sailsIOClient(socketIOClient);

const api_url = process.env.API_URL
  ? process.env.API_URL
  : "https://api.blablapharma.fr";

io.sails.url = api_url;
io.sails.onlyAllowOrigins = [api_url];
io.sails.transports = ["polling"];
io.sails.reconnection = true;
io.sails.environment = process.env.NODE_ENV || "production";

export default io;
