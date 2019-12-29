import { Document, model, Model, Schema } from 'mongoose';
import { generateToken } from '../utils/generateHash';

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
	winners: Array<String>;
}

interface IRoomModel extends IRoom, Document {}

const roomSchema: Schema = new Schema({
	createdAt: { type: Number, default: Date.now() },
	decks: { type: Array, default: []},
	gameCode: { type: String, required: true},
	isPublic: { type: Boolean, required: true},
	name: { type: String, required: true },
	owner: { type: String, required: true},
	players: { type: Array, default: []},
	playersMax: { type: Number, required: true},
	roomId: { type: String, default: () => generateToken() }
});

export const Room: Model<IRoomModel> = model<IRoomModel>("Room", roomSchema);
