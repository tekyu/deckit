import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import themes from "assets/themes";
import ModalContainer from "modals/ModalContainer";
import { Error } from "components/Generic";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ auth, error, modalType }) => {
  return (
    <ThemeProvider theme={themes.default}>
      <Header />
      <Content auth={auth} />
      {error && <Error message={error} />}
      <ModalContainer modalType={modalType} />
    </ThemeProvider>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const {
    app: { error, modalType },
    user: { auth }
  } = state;
  return {
    auth,
    error,
    modalType
  };
};

export default connect(mapStateToProps)(App);
