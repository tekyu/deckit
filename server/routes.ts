import { Express } from 'express';
import controllers from './src/Services/controllers';

const Routes = (app: Express) => {
  app.route('/cards').get(controllers.getDecks);
  app.route('/cards/:deck').get(controllers.getSingleDeck);
};

export default Routes;
