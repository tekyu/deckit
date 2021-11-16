import PageContainer from 'containers/PageContainer/PageContainer';
import {
  Suspense,
} from 'react';
import { useSelector } from 'react-redux';
import { appSelectors } from 'store/app/appSlice';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'theme/GlobalStyles';

const App = (): JSX.Element => {
  const themeLoaded = useSelector(appSelectors.themeLoaded);
  const theme = useSelector(appSelectors.theme);

  return (
    <>
      {themeLoaded && (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Suspense fallback="loading">
            <PageContainer />
          </Suspense>
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
