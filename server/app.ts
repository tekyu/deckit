import SocketIo from "./src/socket/socket";
import Api from "./src/Api/Api";
import Passport from "./src/api/Passport";
import Mongoose from "./src/mongo/mongoose";
import appWrapper from "./appWrapper";

require("dotenv").config();

Mongoose();
SocketIo();
Api(appWrapper(process.env.APP_PORT), Passport);
