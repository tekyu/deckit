import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import themes from "assets/themes";
import ModalContainer from "components/Modals/ModalContainer";
import { Error } from "components/Generic";
import { getTemporaryId } from "store/actions";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ error, modalType, userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) {
      dispatch(getTemporaryId());
    }
  });
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
  modalType: PropTypes.string,
  userId: PropTypes.string
};

const mapStateToProps = state => {
  const {
    app: { error, modalType },
    user: { userId }
  } = state;
  return {
    error,
    modalType,
    userId
  };
};

export default connect(mapStateToProps)(App);
