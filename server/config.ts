// @ts-nocheck
import { config } from 'dotenv';
// const dotenv = require('dotenv');
// Set the NODE_ENV to 'development' by default
// @ts-ignore
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  ports: {
    app: parseInt(process.env.PORT, 10),
    socket: parseInt(process.env.SOCKET_PORT, 10),
  },

  socket: {
    pingTimeout: process.env.SOCKET_PING_TIMEOUT,
    pingInterval: process.env.SOCKET_PING_INTERVAL,
  },

  front: {
    domain: process.env.FRONT_DOMAIN,
  },

  cards: {
    server: process.env.CARDS_SERVER,
  },
  /**
   * That long string from mlab
   */
  db: {
    databaseURL: process.env.DB_ADDRESS,
    databaseCON: process.env.DEVDB_CONN,
    databaseSecret: process.env.DB_SESSION_SECRET,
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

};
