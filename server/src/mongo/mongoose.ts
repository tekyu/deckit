import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import chalk from 'chalk';

const MongoStoreSession = MongoStore(session);
const Mongoose = app => {
  // Create the database connection
  mongoose.connect(process.env.DEVDB_CONN, { useNewUrlParser: true });
  app.use(
    session({
      store: new MongoStoreSession({ mongooseConnection: mongoose.connection })
    })
  );

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', function() {
    console.log(
      chalk.black.bgMagenta(
        `Mongoose default connection open to ${process.env.DB_ADDRESS}`
      )
    );
  });
};

export default Mongoose;
