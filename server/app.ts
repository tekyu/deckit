require("dotenv").config();

import memu from "./src/utils/memory-usage";

import SocketIo from "./src/socket/socket";
import Api from "./src/Api/Api";
import RoomService from "./src/Services/RoomService";
import Passport from "./src/api/Passport";
import Mongoose from "./src/mongo/mongoose";
import appWrapper from "./appWrapper";

const App = appWrapper(process.env.APP_PORT);
SocketIo(App);
Api(App, Passport);
// RoomService(appWrapper(process.env.ROOM_SERVICE_PORT));

Mongoose(App);

// SocketIo();
// const services = (api, socketIo) => {

// };
