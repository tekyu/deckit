import { createAsyncThunk } from '@reduxjs/toolkit';
import { IInitialRoomDetails } from 'containers/CreateGame/ICreateGame';
import { userActions } from 'store/user/userSlice';

interface ISetInitialRoomDetailsProps {
  roomDetails: IInitialRoomDetails;
  userState: number;
}

const setInitialRoomDetails = createAsyncThunk(
  'room/setInitialRoomDetails',
  async ({ roomDetails, userState }: ISetInitialRoomDetailsProps, { dispatch }) => {
    console.log('setInitialRoomDetails', userState);
    dispatch(userActions.setState(userState));
    return roomDetails;
  },
);

export const roomThunks = { setInitialRoomDetails };
