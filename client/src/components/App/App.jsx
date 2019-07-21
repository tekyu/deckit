import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalContainer from 'modals/ModalContainer';
import Header from './Header';
import Content from './Content';
// import axios from "@app/axios";

class App extends Component {
  state = {
    auth: false
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Content auth={this.state.auth} />
        {this.props.showModal ? (
          <ModalContainer type={this.props.modalType} />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    showModal: state.showModal,
    modalType: state.modalType
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
