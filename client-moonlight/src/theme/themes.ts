export interface ITypography {
  primary: string;
  secondary: string;
}

export interface IPalette {
  [key: string]: any;
}

export type themeType = 'light' | 'dark';

export type paletteType = 'backgrounds' | 'colors' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type variantType = 'light' | 'main' | 'dark' | 'contrastType' | 'primary' | 'secondary';

export interface ITheme {
  typography: ITypography;
  border: {
    radius: string;
  }
  palette: IPalette;
  currentTheme: themeType;
  isDarkMode: boolean
}

export const palette = {
  light: {
    backgrounds: {
      primary: '#FAFBFF',
      secondary: '#fff',
    },
    colors: {
      primary: '#444752',
      secondary: '#93959D',
    },
    primary: {
      light: '#ff6272',
      main: '#fd4976',
      dark: '#e44376',
      contrastText: '#FAFBFF',
    },
    secondary: {
      light: '#ac3c74',
      main: '#953973',
      dark: '#6a2952',
      contrastText: '#FAFBFF',
    },
    error: {
      light: '#f3afaf',
      main: '#E23636',
      dark: '#9e2626',
      contrastText: '#FAFBFF',
    },
    warning: {
      light: '#f8e3bf',
      main: '#EDB95E',
      dark: '#a68242',
      contrastText: '#FAFBFF',
    },
    info: {
      light: '#7BADE5',
      main: '#2f7ccf',
      dark: '#084992',
      contrastText: '#FAFBFF',
    },
    success: {
      light: '#c8ecb7',
      main: '#76CF4A',
      dark: '#539134',
      contrastText: '#FAFBFF',
    },
  },
  dark: {
    backgrounds: {
      primary: '#1f2022',
      secondary: '#1b1d1e',
    },
    colors: {
      primary: '#e1e2e6',
      secondary: '#a7a7a8',
    },
    primary: {
      light: '#7BADE5',
      main: '#2f7ccf',
      dark: '#084992',
      contrastText: '#e1e2e6',
    },
    secondary: {
      light: '#F774A0',
      main: '#f34d85',
      dark: '#E8004E',
      contrastText: '#e1e2e6',
    },
    error: {
      light: '#7BADE5',
      main: '#2f7ccf',
      dark: '#084992',
      contrastText: '#e1e2e6',
    },
    warning: {
      light: '#7BADE5',
      main: '#2f7ccf',
      dark: '#084992',
      contrastText: '#e1e2e6',
    },
    info: {
      light: '#7BADE5',
      main: '#2f7ccf',
      dark: '#084992',
      contrastText: '#e1e2e6',
    },
    success: {
      light: '#7BADE5',
      main: '#2f7ccf',
      dark: '#084992',
      contrastText: '#e1e2e6',
    },
  },

};

export const initialTheme = {
  typography: {
    primary: '\'Fira Sans\', sans-serif',
    secondary: '\'Hammersmith One\', sans-serif',
  },
  border: {
    radius: '6px',
  },
};

export const getTheme = (newTheme: themeType): ITheme => ({
  ...initialTheme,
  palette: palette[newTheme],
  currentTheme: newTheme,
  isDarkMode: newTheme === 'dark',
});

// https://dribbble.com/shots/9408016-Colors-Space307/attachments/1432747?mode=media
// https://dribbble.com/tags/dark_color_palette
// https://uxdesign.cc/dark-mode-ui-design-the-definitive-guide-part-1-color-53dcfaea5129