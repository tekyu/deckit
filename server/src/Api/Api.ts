import { Request, Response } from "express";
import { Room } from "../models";
import AuthApi from "./auth/auth";
import { generateToken } from "../utils/generateHash";

const Api = (app: any, passport: any) => {
  console.log("Api loaded");
  AuthApi(app, passport);
  app.get("/api/rooms", async (req: Request, res: Response) => {
    const allRooms = await Room.find();
    res.status(200).send({ rooms: allRooms });
  });

  app.get("/api/rooms/:roomId", async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const room = await Room.findOne({ roomId });
    if (room) {
      res.status(200).send({ room });
    } else {
      res.sendStatus(404);
    }
  });

  app.post("/api/rooms", async (req: Request, res: Response) => {
    const { gameCode, isPublic, name, playersMax } = req.body;
    const owner = req.body.owner || generateToken();
    const newRoom = new Room({
      gameCode,
      isPublic,
      owner,
      name,
      playersMax
    });
    await newRoom.save();
    const { roomId } = newRoom;
    res.status(201).send({ owner, roomId });
  });
};

export default Api;
