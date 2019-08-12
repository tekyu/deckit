require("dotenv").config();

import memu from "./src/utils/memory-usage";

import SocketIo from "./src/socket/socket";
import Api from "./src/Api/Api";
import Passport from "./src/api/Passport";
import Mongoose from "./src/mongo/mongoose";
import appWrapper from "./appWrapper";

Mongoose();
Api(appWrapper(), Passport);
SocketIo();
