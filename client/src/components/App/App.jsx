import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import themes from "assets/themes";
import ModalContainer from "components/Modals/ModalContainer";
import { Error } from "components/Generic";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ error, modalType }) => {
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
  error: PropTypes.string,
  modalType: PropTypes.string
};

const mapStateToProps = state => {
  const {
    app: { error, modalType }
  } = state;
  return {
    error,
    modalType
  };
};

export default connect(mapStateToProps)(App);
