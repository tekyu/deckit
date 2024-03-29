import { Express } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import logger from '../loaders/logger';

const MongoStoreSession = MongoStore(session);
const Mongoose = (app: Express) => {
  if (!process.env.DEVDB_CONN) {
    return;
  }
  // Create the database connection
  mongoose.connect(process.env.DEVDB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.use(
    // @ts-ignore
    session({
      store: new MongoStoreSession({ mongooseConnection: mongoose.connection }),
    }),
  );

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.info(`Mongoose default connection open to ${process.env.DB_ADDRESS}`);
  });
};

export default Mongoose;
