import { createSlice } from '@reduxjs/toolkit';
import sillyname from 'sillyname';
import { RootState } from 'store/store';

export interface IUserState {
  username: string;
  anonymous: boolean;
  id: string;
  state: number;
  initialized: boolean;
}

const initialState: IUserState = {
  username: sillyname(),
  anonymous: true,
  id: '',
  state: 0,
  initialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.username = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setState(state, action) {
      state.state = action.payload;
    },
    initializeUser(state, action) {
      state.id = action.payload.id;
      state.initialized = true;
    },
  },
});

const { actions: userActions, reducer: userReducer } = userSlice;

const userSelectors = {
  user: (state: RootState): IUserState => state.user,
  name: (state: RootState): string => state.user.username,
  anonymous: (state: RootState): boolean => state.user.anonymous,
  state: (state: RootState): number => state.user.state,
  id: (state: RootState): string => state.user.id,
};

export { userActions, userReducer, userSelectors };
