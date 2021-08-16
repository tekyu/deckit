import React from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Error from 'components/Generic/Error/Error';
import { ToastContainer } from 'react-toastify';
import { selectError, selectModalType } from 'store/app/appSelectors';
import ModalContainer from 'modals/ModalContainer';
import Header from './Header/Header';
import Content from './Content/Content';
import Theme from '../../Theme/Theme';

const App = (): JSX.Element => {
  const modalType = useSelector(selectModalType);
  const error = useSelector(selectError);

  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <Header />
          {error && <Error message={error} />}
          <Content />
          <ModalContainer modalType={modalType} />
          <ToastContainer />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default App;
