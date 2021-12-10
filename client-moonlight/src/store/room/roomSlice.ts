import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { IChangeStateResponse, IRoomState } from 'store/room/roomInterfaces';
import { roomThunks } from 'store/room/roomThunks';
import { RootState } from 'store/store';

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
  playerLimit: 0,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    resetRoom() {
      return initialState;
    },
    setActiveRoomId(state, action) {
      state.activeRoomId = action.payload;
    },
    updateRoom(state, { payload }: { payload: Partial<IRoomState> }) {
      // to not create multiple unnecessary listeners, this action will receive object
      // of { property: value } where property is one of the keys in the state object
      // eg. if there will be update of array of players, data will look like { players: array }
      return {
        ...state,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(roomThunks.setInitialRoomDetails.fulfilled,
      (state, { payload }) => {
        state.activeRoomId = payload.id;
        state.mode = payload.mode;
        state.playersMax = payload.playersMax;
        state.gameCode = payload.gameCode;
        state.name = payload.name;
        state.id = payload.id;
        state.owner = payload.owner;
        state.admin = payload.admin;
        state.players = payload.players;
        state.state = payload.state;
        state.playerLimit = payload.playerLimit;
      });
    builder.addCase(roomThunks.createRoom.fulfilled,
      (state, { payload }) => {
      });
    builder.addCase(roomThunks.joinRoom.fulfilled,
      (state, action): any => { });
    builder.addCase(roomThunks.joinRoom.rejected,
      (state, action): any => { });
    builder.addCase(roomThunks.kickPlayer.fulfilled, () => initialState);
    builder.addCase(roomThunks.changeUserState.fulfilled,
      (state: IRoomState, { payload }: PayloadAction<IChangeStateResponse>) => {
        state.players = payload.players;
        state.state = payload.updatedState;
      });
    builder.addCase(roomThunks.changeUserState.rejected, () => { });
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
