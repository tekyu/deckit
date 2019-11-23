import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ModalContainer from "modals/ModalContainer";
import Error from "components/Generic/Error/Error";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ auth, modalType, error }) => {
  return (
    <React.Fragment>
      <Header />
      {error && <Error message={error} />}
      <Content auth={auth} />
      <ModalContainer modalType={modalType} />
    </React.Fragment>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
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
