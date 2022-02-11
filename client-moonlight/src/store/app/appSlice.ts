import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { getTheme, ITheme, themeType } from 'theme/themes';

export interface IAppState {
  activeTheme: themeType;
  themeLoaded: boolean;
  theme: ITheme;
  miniSidebar: boolean;
  host: string;
}

const initialState: IAppState = {
  activeTheme: 'light',
  themeLoaded: true,
  theme: getTheme('light'),
  miniSidebar: false,
  host: 'http://localhost:3011',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTheme(state, { payload }) {
      state.activeTheme = payload;
      state.theme = getTheme(payload);
    },
    changeMiniSidebar(state) {
      state.miniSidebar = !state.miniSidebar;
    },
  },

});

const { actions: appActions, reducer: appReducer } = appSlice;

const appSelectors = {
  activeTheme: (state: RootState): themeType => state.app.activeTheme,
  themeLoaded: (state: RootState): boolean => state.app.themeLoaded,
  theme: (state: RootState): ITheme => state.app.theme,
  miniSidebar: (state: RootState): boolean => state.app.miniSidebar,
  host: (state: RootState): string => state.app.host,

};

export { appActions, appReducer, appSelectors };
