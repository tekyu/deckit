import { model, Schema } from "mongoose";

export const roomSchema: Schema = new Schema({
	name: { type: String, required: true },
    hash: { type: String, required: true },
    isPublic: { type: Boolean, required: true},
    playersMax: { type: Number, required: true},
    gameCode: { type: String, required: true},
    decks: { type: Array, default: []},
	createdAt: { type: Number, default: Date.now() }
});

export const Room = model('Room', roomSchema)