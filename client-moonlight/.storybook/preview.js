import { store } from '../src/store/store';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

import { ThemeProvider } from 'styled-components';

import { initialTheme, palette } from '../src/theme/themes'

// Function to obtain the intended theme
const getTheme = (themeName) => {
  return { ...initialTheme, palette: palette[themeName] }
}

const withThemeProvider = (Story, context) => {
  const selectedTheme = getTheme(context.globals.theme);
  return (
    <ThemeProvider theme={selectedTheme}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider];