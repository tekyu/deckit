import React, { Component } from 'react';
import Header from 'layout/Header/Header';
import Content from 'layout/Content/Content';
// import axios from "@app/axios";
import { connect } from 'react-redux';
import ModalContainer from 'modals/ModalContainer';

class Layout extends Component {
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
)(Layout);
