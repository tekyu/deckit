// @ts-nocheck

import SocketIo from './src/socket/socket';
import Mongoose from './src/mongo/mongoose';
import appWrapper from './appWrapper';
import Routes from './routes';

const App = appWrapper(process.env.APP_PORT);

SocketIo(App);
Routes(App);
Mongoose(App);
