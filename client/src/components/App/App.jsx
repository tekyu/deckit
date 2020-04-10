import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ModalContainer from "modals/ModalContainer";
import Error from "components/Generic/Error/Error";
import { ToastContainer } from "react-toastify";
import { userActions } from "store/actions";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Theme from "../../Theme/Theme";

const App = ({ auth, modalType, error }) => {
  useEffect(() => {
    userActions.checkAuth();
  }, []);

  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <Header />
          {error && <Error message={error} />}
          <Content auth={auth} />
          <ModalContainer modalType={modalType} />
          <ToastContainer />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func,
  modalType: PropTypes.string,
  error: PropTypes.string
};

const mapStateToProps = state => {
  const {
    app: { error, modalType },
    user: { auth }
  } = state;
  return {
    auth,
    modalType,
    error
  };
};

export default connect(mapStateToProps)(App);
