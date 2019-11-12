import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ModalContainer from "modals/ModalContainer";
import Error from "components/Generic/Error/Error";
import Header from "./Header/Header";
import Content from "./Content/Content";

import { initializeSocket } from "store/actions/socket";
import io from "socket.io-client";

class App extends Component {
  // componentDidMount() {
  //   // const socket = io("localhost:3012");
  //   // this.props.initializeSocket(socket);
  // }
  static getDerivedStateFromProps(props, state) {}

  render() {
    const { auth, modalType, showModal, error, state } = this.props;
    return (
      <React.Fragment>
        <Header />
        {error && <Error message={error} />}
        <Content auth={auth} />
        {showModal && <ModalContainer type={modalType} />}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  initializeSocket: PropTypes.func
};

const mapStateToProps = (
  { user: { auth }, modal: { showModal, modalType }, app: { error } },
  state
) => {
  return {
    auth,
    modalType,
    showModal,
    error,
    state
  };
};
const mapDispatchToProps = {
  initializeSocket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
