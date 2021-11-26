import { EnhancedStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore, persistor } from 'store/store';
import { ThemeProvider } from 'styled-components';
import { getTheme, themeType } from 'theme/themes';

export const renderWithTheme = (
  tree: React.ReactNode,
  theme: themeType = 'light',
): RenderResult => render(
  <ThemeProvider theme={getTheme(theme)}>
    {tree}
  </ThemeProvider>,
);

export const renderWithStore = (
  tree: React.ReactNode,
  store: EnhancedStore,
): RenderResult => render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={getTheme('light')}>
        {tree}
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
