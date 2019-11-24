import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import themes from "assets/themes";
import { connect } from "react-redux";
import ModalContainer from "modals/ModalContainer";
import Error from "components/Generic/Error/Error";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ auth, modalType, error }) => {
  return (
    <>
      <ThemeProvider theme={themes.default}>
        <Header />
        {error && <Error message={error} />}
        <Content auth={auth} />
        <ModalContainer modalType={modalType} />
      </ThemeProvider>
    </>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
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
