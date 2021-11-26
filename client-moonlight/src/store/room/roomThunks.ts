import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateRoom,
  IInitialRoomDetails,
  IJoinRoom,
  IJoinRoomResponse,
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

// const createRoom = createAsyncThunk(
//   'room/createRoom',
//   async (createParams: ICreateRoom, { dispatch }) => {
//     await dispatch(socketActions.emit(
//       socketTopics.room.createRoom,
//       createParams,
//       ({ roomDetails, userDetails: { state: userState }, error }: IRoomCreateResponse) => {
//         if (!error) {
//           dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState }));
//           return roomDetails;
//         }
//         return {};
//       },
//     ));
//   },
// );

const createRoom = createAsyncThunk(
  'room/createRoom',
  async (createParams: ICreateRoom, { dispatch }): Promise<any> => new Promise((resolve) => {
    dispatch(socketActions.emit(
      socketTopics.room.createRoom,
      createParams,
      ({ roomDetails, userDetails: { state: userState }, error }: IRoomCreateResponse) => {
        if (!error) {
          dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState }));
          resolve({ roomDetails, userState } as any);
        }
        return {};
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
    console.log('0');
    dispatch(socketActions.emit(
      socketTopics.room.joinRoom,
      { roomId, userData },
      ({ roomDetails, error }: IJoinRoomResponse) => {
        console.log('1', roomDetails, error);
        if (roomDetails) {
          console.log('2');
          dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState: 0 }));
          resolve({ roomDetails, error } as IJoinRoomResponse);
        }
        if (error) {
          console.log('3');
          reject(new Error(error));
        }
      },
    ));
  }),
);

// const joinRoom = createAsyncThunk(
//   'room/joinRoom',
//   async ({
//     roomId,
//     userData,
//   }: IJoinRoom, { dispatch }) => {
//     console.log('0');
//     return dispatch(socketActions.emit(
//       socketTopics.room.joinRoom,
//       { roomId, userData },
//       ({ roomDetails, error }: IJoinRoomResponse) => {
//         console.log('1', roomDetails, error);
//         if (error) {
//           console.log('2');
//           return error;
//           // resolve({ roomDetails, error } as IJoinRoomResponse);
//         }
//         console.log('3');
//         if (roomDetails) {
//           dispatch(roomActions.setInitialRoomDetails({ roomDetails, userState: 0 }));
//         }
//         return roomDetails;
//       },
//     ));
//   },
// );

export const roomThunks = { setInitialRoomDetails, createRoom, joinRoom };
