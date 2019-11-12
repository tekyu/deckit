import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "store/actions/modals";
import * as styles from "./ModalContainer.module.scss";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import AnonymousLoginModal from "./AnonymousLoginModal/AnonymousLoginModal";

class ModalContainer extends Component {
  state = {};

  getModal = () => {
    const modalTypes = {
      login: "login",
      register: "register",
      anonymous: "anonymous"
    };
    const { modalType } = this.props;
    switch (modalType) {
      case modalTypes.login:
        return <LoginModal />;
      case modalTypes.register:
        return <RegisterModal />;
      case modalTypes.anonymous:
        return <AnonymousLoginModal />;
      default:
        return null;
    }
  };

  closeModal = e => {
    e.preventDefault();
    this.props.closeModal();
  };

  render() {
    const modal = this.getModal();
    return (
      <div className={styles.backdrop}>
        <div className={styles.container}>
          <div onClick={this.closeModal} className={styles.close} />

          <div className={styles.content}>{modal}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ modal: { modalType } }) => {
  return {
    modalType
  };
};

const mapDispatchToProps = {
  closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
