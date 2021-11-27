import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { getTheme, ITheme, themeType } from 'theme/themes';

export interface IAppState {
  activeTheme: themeType;
  themeLoaded: boolean;
  theme: ITheme;
}

const initialState: IAppState = {
  activeTheme: 'light',
  themeLoaded: true,
  theme: getTheme('light'),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTheme(state, { payload }) {
      state.activeTheme = payload;
      state.theme = getTheme(payload);
    },
  },

});

const { actions: appActions, reducer: appReducer } = appSlice;

const appSelectors = {
  activeTheme: (state: RootState): themeType => state.app.activeTheme,
  themeLoaded: (state: RootState): boolean => state.app.themeLoaded,
  theme: (state: RootState): ITheme => state.app.theme,

};

export { appActions, appReducer, appSelectors };
