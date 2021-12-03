import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateRoom,
  IInitialRoomDetails,
  IJoinRoom,
  IJoinRoomResponse,
  IRoomCreateResponse,
  ISetInitialRoomDetailsProps,
  IChangeState,
  IChangeStateResponse,
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
    userData,
  }: IJoinRoom, { dispatch }): Promise<IJoinRoomResponse> => new Promise((resolve, reject) => {
    dispatch(socketActions.emit(
      socketTopics.room.joinRoom,
      { roomId, userData },
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
  async (_, { dispatch }) => {
    dispatch(userActions.setState(0));
  },
);

const changeUserState = createAsyncThunk(
  'room/changeUserState',
  async ({ state }: IChangeState, { dispatch }) => {
    dispatch(socketActions.emit(
      socketTopics.player.changeState,
      { state },
      ({ players, error }: IChangeStateResponse) => {
        if (error) {
          dispatch(roomActions.resetRoom());
        }
        dispatch(roomActions.updateRoom({ players }));
        dispatch(userActions.setState(state));
      },
    ));
  },
);
export const roomThunks = {
  setInitialRoomDetails, createRoom, joinRoom, kickPlayer, changeUserState,
};
