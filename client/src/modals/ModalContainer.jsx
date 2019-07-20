import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from 'store/actions/modals';
import * as styles from './ModalContainer.module.scss';
import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

class ModalContainer extends Component {
  state = {};

  getModal = () => {
    const modelTypes = {
      login: 'login',
      register: 'register'
    };
    switch (this.props.modalType) {
      case modelTypes.login:
        return <LoginModal />;
      case modelTypes.register:
        return <RegisterModal />;
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

const mapStateToProps = ({ modalType }) => {
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
