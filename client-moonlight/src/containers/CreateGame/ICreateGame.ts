import React from 'react';
import { modeType } from 'store/room/IRoom';

export interface ICreateGame {
  children?: React.ReactNode;
}

export interface IInitialRoomDetails {
  mode: modeType;
  playersMax: number;
  gameCode: string;
  name: string;
  id: string;
  owner: string;
  admin: string;
  players: any[];
  state: number;
}

export interface IInitialUserDetails {
  state: number;
  anonymous: boolean;
  id: string;
  username: string;
}

export interface IRoomCreateResponse {
  roomDetails: IInitialRoomDetails;
  userDetails: IInitialUserDetails;
}

export interface IFormValues {
  gameCode: string;
  name: string;
  playersMax: number;
  maxScore: number;
  isPrivate: boolean;
}
