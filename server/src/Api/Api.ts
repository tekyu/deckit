import { Request, Response, NextFunction } from 'express';
import { Room } from "../schemas";
import AuthApi from "./auth/auth";
import { generateToken } from '../utils/generateHash';

const Api = (app: any, passport: any) => {
  console.log("Api loaded");
  AuthApi(app, passport);
  app.get("/api/rooms", async (req: Request, res: Response, next : NextFunction) => {
    const allRooms = await Room.find();
    res.status(200).send({ rooms: allRooms });
  });

  app.get("/api/rooms/:roomId", async (req: Request, res: Response, next : NextFunction) => {
    const { roomId } = req.params;
    const room = await Room.findOne({hash:roomId})
    if(room) {
      res.status(200).send({ room })
    }
    else {
      res.sendStatus(404);
    }
  });

  app.post("/api/rooms", async (req: Request, res: Response, next : NextFunction) => {
    const { gameCode, isPublic, name, playersMax } = req.body;
    const newRoom = new Room({
      gameCode,
      hash: generateToken(),
      isPublic,
      name,
      playersMax
    });
    await newRoom.save();
    res.status(201).send();
  });

};

export default Api;