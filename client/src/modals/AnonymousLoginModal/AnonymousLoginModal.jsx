import React, { Component } from "react";
import {
  updatedUser,
  closeModal,
  emitter,
  UPDATE_ANON_USER
} from "store/actions";

import { connect } from "react-redux";
import sillyname from "sillyname";

import * as styles from "./AnonymousLoginModal.module.scss";

class AnonymousLoginModal extends Component {
  state = {
    username: sillyname()
  };

  inputOnChangeHandler = event => {
    const change = {
      [event.target.name]: event.target.value
    };
    this.setState(() => {
      return change;
    });
  };

  componentDidUpdate(prevProps) {
    const { user, closeModal } = this.props;
    if (user || user !== prevProps.user) {
      closeModal();
    }
  }

  submitHandler = event => {
    event.preventDefault();
    const { emitter, updatedUser } = this.props;
    const { username } = this.state;
    emitter(UPDATE_ANON_USER, { username }, userData => {
      // update user on this side
      updatedUser(userData);
    });
  };

  render() {
    return (
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <i className={styles.ikontest} />
          <h2>Choose your username</h2>
          <p>Lets have fun!</p>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={this.submitHandler}>
            <div className={styles.input_group}>
              <label className={styles.input_label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input_input}
                type="text"
                name="username"
                placeholder="Type your username here"
                onChange={this.inputOnChangeHandler}
              />
            </div>
            {this.state.formError ? (
              <div className={styles.form_error}>{this.state.formError}</div>
            ) : null}

            <button type="submit">Choose</button>
          </form>
        </div>
        <div className={styles.modal_footer}>
          <label className={styles.create_account}>
            You don&apos;t have an account yet? <a href="#">Create one here!</a>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { user } }) => {
  return {
    user
  };
};

const mapDispatchToProps = {
  closeModal,
  emitter,
  updatedUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousLoginModal);
