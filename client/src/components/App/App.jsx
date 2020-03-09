import React, { useEffect, useCallback, useDispatch } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import themes from "assets/themes";
import ModalContainer from "components/Modals/ModalContainer";
import { ToastContainer } from "react-toastify";
import { Error } from "components/Generic";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ auth, checkAuth, modalType, error }) => {
  const checkIfAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    checkIfAuth();
  }, [checkIfAuth]);

  return (
    <>
      <ThemeProvider theme={themes.default}>
        <Header />
        {error && <Error message={error} />}
        <Content auth={auth} />
        <ModalContainer modalType={modalType} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func,
  modalType: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default App;
