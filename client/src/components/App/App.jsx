import React, { useEffect, useCallback, useDispatch } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import themes from "assets/themes";
import ModalContainer from "components/Modals/ModalContainer";
import { Error } from "components/Generic";
import { getTemporaryId } from "store/actions";
import Header from "./Header/Header";
import Content from "./Content/Content";
import { checkAuth } from "../../store/user/userActions";

const App = ({ auth, checkAuth, modalType, error }) => {
  const checkIfAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    checkIfAuth();
  }, [checkIfAuth]);
  return (
    <ThemeProvider theme={themes.default}>
      <Header />
      <Content />
      {error && <Error message={error} />}
      {modalType && <ModalContainer modalType={modalType} />}
    </ThemeProvider>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func,
  modalType: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default App;
