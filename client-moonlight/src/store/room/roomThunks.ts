import { gameActions, IGameState } from 'store/game/gameSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateRoom,
  IJoinRoom,
  IJoinRoomResponse,
  IRoomCreateResponse,
  ISetInitialRoomDetailsProps,
  IChangeState,
  IChangeStateResponse,
  IRoomState,
} from 'store/room/roomInterfaces';
import { roomActions } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userActions } from 'store/user/userSlice';

const setInitialRoomDetails = createAsyncThunk(
  'room/setInitialRoomDetails',
  async ({ roomDetails, userState }: ISetInitialRoomDetailsProps, { dispatch }) => {
    dispatch(userActions.setState(userState));
    return roomDetails;
  },
);

const createRoom = createAsyncThunk(
  'room/createRoom',
  async (
    createParams: ICreateRoom,
    { dispatch },
  ): Promise<any> => new Promise((resolve, reject) => {
    dispatch(socketActions.emit(
      socketTopics.room.createRoom,
      createParams,
      ({ roomDetails, userDetails: { state: userState }, error }: IRoomCreateResponse) => {
        if (!error) {
          dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState }));
          resolve({ roomDetails, userState } as any);
        }
        reject(new Error(error));
      },
    ));
  }),
);

const joinRoom = createAsyncThunk(
  'room/joinRoom',
  async ({
    roomId,
  }: IJoinRoom, { dispatch }): Promise<IJoinRoomResponse> => new Promise((resolve, reject) => {
    dispatch(socketActions.emit(
      socketTopics.room.joinRoom,
      { roomId },
      ({ roomDetails, error }: IJoinRoomResponse) => {
        if (roomDetails) {
          dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState: 0 }));
          resolve({ roomDetails, error } as IJoinRoomResponse);
        }
        if (error) {
          reject(new Error(error));
        }
      },
    ));
  }),
);

const kickPlayer = createAsyncThunk(
  'room/kickPlayer',
  async ({ roomId }: { roomId: string }, { dispatch }) => {
    dispatch(userActions.setState(0));
    dispatch(userActions.updateKickedFrom(roomId));
  },
);

const changeUserState = createAsyncThunk(
  'room/changeUserState',
  async ({
    state,
  }: IChangeState, { dispatch }): Promise<IChangeStateResponse> => new Promise(
    (resolve, reject) => {
      dispatch(socketActions.emit(
        socketTopics.player.changeState,
        { state },
        ({ players, updatedState, error }: IChangeStateResponse) => {
          if (error) {
            reject(new Error(error));
          }
          if (players) {
            dispatch(userActions.setState(state));
            resolve({ players, updatedState, error } as IChangeStateResponse);
          }
        },
      ));
    },
  ),
);

interface IReconnect {
  playerId: string;
  roomId: string;
}

interface IReconnectCallback {
  roomDetails: Partial<IRoomState>;
  gameDetails: Partial<IGameState>;
}

const reconnect = createAsyncThunk(
  'room/reconnect',
  async ({ playerId, roomId }: IReconnect, { dispatch }): Promise<string> => new Promise(
    (resolve, reject) => {
      dispatch(socketActions.emit(
        socketTopics.room.reconnect,
        { playerId, roomId },
        ({ roomDetails, gameDetails }: IReconnectCallback) => {
          if (roomDetails && gameDetails) {
            dispatch(gameActions.updateGame(gameDetails));
            dispatch(roomActions.updateRoom(roomDetails));
            resolve(roomId);
          } else {
            reject(new Error('noroom'));
          }
        },
      ));
    },
  ),
);

export const roomThunks = {
  setInitialRoomDetails, createRoom, joinRoom, kickPlayer, changeUserState, reconnect,
};
