import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateRoom,
  IInitialRoomDetails,
  IJoinRoom,
  IRoomCreateResponse,
  ISetInitialRoomDetailsProps,
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
  async (createParams: ICreateRoom, { dispatch }) => {
    await dispatch(socketActions.emit(
      socketTopics.room.createRoom,
      createParams,
      ({ roomDetails, userDetails: { state: userState } }: IRoomCreateResponse) => {
        dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState }));
      },
    ));
  },
);

// const createRoom = createAsyncThunk(
//   'room/createRoom',
//   async (
//     createParams: ICreateRoom,
//     { dispatch },
//   ): Promise<IRoomCreateResponse> => new Promise((resolve) => {
//     dispatch(socketActions.emit(
//       socketTopics.room.createRoom,
//       createParams,
//       ({ roomDetails, userDetails }: IRoomCreateResponse) => {
//         resolve({ roomDetails, userDetails } as IRoomCreateResponse);
//       },
//     ));
//   }),
// );

const joinRoom = createAsyncThunk(
  'room/joinRoom',
  async ({ roomId, userData }: IJoinRoom, { dispatch }) => {
    await dispatch(socketActions.emit(
      socketTopics.room.joinRoom,
      { roomId, userData },
      (roomDetails: IInitialRoomDetails) => {
        dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState: 0 }));
      },
    ));
  },
);

export const roomThunks = { setInitialRoomDetails, createRoom, joinRoom };
