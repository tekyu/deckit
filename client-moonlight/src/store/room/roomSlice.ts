import { createSlice } from '@reduxjs/toolkit';
import { modeType } from 'store/room/IRoom';
import { roomThunks } from 'store/room/roomThunks';
import { RootState } from 'store/store';

export interface IPlayer {
  color: string;
  username: string;
  id: string;
  anonymous: boolean;
  state: number;
}

export interface IRoomState {
  mode: modeType;
  activeRoomId: string;
  playersMax: number;
  gameCode: string;
  name: string;
  id: string;
  owner: string;
  admin: string;
  players: IPlayer[];
  state: number;
}

const initialState: IRoomState = {
  activeRoomId: '',
  mode: '',
  playersMax: 0,
  gameCode: '',
  name: '',
  id: '',
  owner: '',
  admin: '',
  players: [],
  state: 0,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setActiveRoomId(state, action) {
      state.activeRoomId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(roomThunks.setInitialRoomDetails.fulfilled, (state, action) => {
      state.activeRoomId = action.payload.id;
      state.mode = action.payload.mode;
      state.playersMax = action.payload.playersMax;
      state.gameCode = action.payload.gameCode;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.owner = action.payload.owner;
      state.admin = action.payload.admin;
      state.players = action.payload.players;
      state.state = action.payload.state;
    });
  },
});

const { actions, reducer: roomReducer } = roomSlice;

const roomActions = {
  ...actions,
  ...roomThunks,
};

const roomSelectors = {
  room: (state: RootState): IRoomState => state.room,
  activeRoomId: (state: RootState): string => state.room.activeRoomId,
  state: (state: RootState): number => state.room.state,
  id: (state: RootState): string => state.room.id,
};

export { roomActions, roomReducer, roomSelectors };
