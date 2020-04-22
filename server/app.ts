// @ts-nocheck
// require('dotenv').config();

import memu from './src/utils/memory-usage';

import SocketIo from './src/socket/socket';
import Api from './src/api/Api';
import Passport from './src/api/Passport';
import Mongoose from './src/mongo/mongoose';
import appWrapper from './appWrapper';
import Routes from './routes';

const App = appWrapper(process.env.APP_PORT);

SocketIo(App);
// Api(App, Passport);
Routes(App);

Mongoose(App);
