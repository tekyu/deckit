import PageContainer from 'containers/PageContainer/PageContainer';
import {
  Suspense,
} from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { appSelectors } from 'store/app/appSlice';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'theme/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';
import * as Styled from './App.styled';

const App = (): JSX.Element => {
  const themeLoaded = useSelector(appSelectors.themeLoaded);
  const theme = useSelector(appSelectors.theme);

  return (
    <Styled.Container>
      {themeLoaded && (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Suspense fallback="loading">
            <PageContainer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className="deckit-toastify-container"
            />
          </Suspense>
        </ThemeProvider>
      )}
    </Styled.Container>
  );
};

export default App;
