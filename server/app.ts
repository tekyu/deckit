import { Express } from 'express';

import SocketIo from './src/socket/socket';
import Mongoose from './src/mongo/mongoose';
import appWrapper from './appWrapper';
import Routes from './routes';

const App = appWrapper(Number(process.env.APP_PORT) || 3011);

SocketIo();
Routes(<Express>App);
Mongoose(App);
