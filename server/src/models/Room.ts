import { Document, model, Model, Schema } from "mongoose";
import { generateToken } from "../utils/generateHash";

interface IRoom {
  chat: Array<Object>;
  createdAt: number;
  gameCode: string;
  gameOptions: Object;
  isPublic: boolean;
  name: string;
  owner: string;
  players: Array<Object>;
  playersMax: number;
  roomId: string;
  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended
}

interface IRoomModel extends Document, IRoom {}

const roomSchema: Schema = new Schema({
  chat: [
    {
      msgId: { type: String, required: true },
      author: { type: String },
      message: { type: String, required: true },
      timeStamp: { type: Number, required: true }
    }
  ],
  createdAt: { default: Date.now(), type: Number },
  decks: { type: Array, default: [] },
  gameCode: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  players: [
    {
      isConnected: { type: Boolean, required: true },
      isRegistered: { type: Boolean, default: false },
      userId: { type: String, required: true },
      username: { type: String, required: true }
    }
  ],
  playersCurrent: { type: Number, default: 0 },
  playersMax: { type: Number, required: true },
  roomId: { type: String, default: () => generateToken() }
});

export const Room: Model<IRoomModel> = model<IRoomModel>("Room", roomSchema);
