import React, { Component } from 'react';
import * as styles from './GenericModal.module.scss';

class GenericModal extends Component {
  state = {};

  listenKeyboard(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener(
        'keydown',
        this.listenKeyboard.bind(this),
        true
      );
    }
  }

  onOverlayClick() {
    this.props.onClose();
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div className={styles.modal_backdrop}>
        <div className={styles.modal_container}>
          <div className={styles.modal_close} onClick={this.onOverlayClick} />
          <div className={styles.modal_header}>
            <i className={styles.ikontest} />
            <h2>Register</h2>
            <p>Lets have fun!</p>
            {/* {this.props.modalIcon}
                        {this.props.modalTitle}
                        {this.props.modalSubtitle} */}
          </div>
          <div className={styles.modal_body}>
            {/* {this.props.modalBody} */}
          </div>
          <div className={styles.modal_footer}>
            {/* {this.props.modalFooter} */}
            <label className={styles.create_account}>
              Already have an account? <a href="#">Create one here!</a>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default GenericModal;
