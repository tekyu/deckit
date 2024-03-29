// @ts-nocheck

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import path from 'path';
import logger from './src/loaders/logger';

const appWrapper = (IncomingPort = 3011) => {
  const app = express();
  const port = IncomingPort;

  app.set('port', process.env.APP_PORT || 3011);

  /* APP */

  // app.use(
  //   cookieSession({
  //     maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  //     keys: [process.env.COOKIE_KEY]
  //   })
  // );

  app.use('/card', express.static(path.join(__dirname, 'card')));

  app.options(
    '*',
    cors({
      credentials: true,
      origin: process.env.DEV_ADDRESS,
      optionsSuccessStatus: 200,
    }),
  );
  app.post(
    '*',
    cors({
      credentials: true,
      origin: process.env.DEV_ADDRESS,
      optionsSuccessStatus: 200,
    }),
  );
  app.get(
    '*',
    cors({
      credentials: true,
      origin: process.env.DEV_ADDRESS,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(
    expressSession({
      secret: process.env.COOKIE_KEY,
      resave: false, // required
      saveUninitialized: false, // required
      cookie: {
        expires: 1000 * 60 * 60 * 24 * 3,
        rolling: true,
      },
    }),
  );
  // app.use(Passport.initialize());
  // app.use(Passport.session());
  app.set('view engine', 'ejs');

  app.listen(port, () => logger.info(`✌️ Server listening on port ${port}`));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });
  // app.get('/showusers', (req, res) => {
  //   User.find({}, (err, users) => {
  //     res.render('ShowUsers.ejs', { users });
  //   });
  // });

  return app;
};
export default appWrapper;
