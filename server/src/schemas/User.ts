// const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");
// const bcrypt = require("bcrypt");
// import mongoose from 'mongoose';
import { Document, Schema, Model, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
export interface IUserModel extends IUser, Document {
  validPassword(password: string): any;
}

export const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  token: String,
  friends: { type: Array, default: [] },
  email: { type: String },
  avatar: { data: Buffer, contentType: String },
  activeGames: { type: Array, default: [] },
  ranking: { type: Number, default: 1200 },
  notifications: { type: Array, default: [] },
  emailConsent: { type: Boolean, default: false },
  privacyConsent: { type: Boolean, default: false },
  createdCards: { type: Array, default: [] },
  createdDecks: { type: Array, default: [] },
  achievements: { type: Array, default: [] },
  createdAt: { type: Number, default: Date.now() },
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.hash);
};

UserSchema.virtual('password').set(function (value: any) {
  this.hash = bcrypt.hashSync(value, 12);
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
