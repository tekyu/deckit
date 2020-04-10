import React, { Component } from "react";
import { appActions, socketActions, userActions } from "store/actions";
import TextField from "@material-ui/core/TextField";
import { Button } from "components/Generic";

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
    socketActions.emitter(
      userActions.UPDATE_ANON_USER,
      { username },
      userData => {
        // update user on this side
        userActions.updatedUser(userData);
      }
    );
  };

  render() {
    return (
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <i className={styles.ikontest} />
          <h2>Choose your username</h2>
          <p>{`Let's have fun!`}</p>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={this.submitHandler}>
            <div className={styles.input_group}>
              <TextField
                name="username"
                label="Nickname"
                placeholder="Type your nickname here"
                value={this.state.username}
                onChange={this.inputOnChangeHandler}
              />
            </div>
            {this.state.formError ? (
              <div className={styles.form_error}>{this.state.formError}</div>
            ) : null}

            <Button variant="contained" color="primary" type="submit">
              Choose
            </Button>
          </form>
        </div>
        {/* <div className={styles.modal_footer}>
          <label className={styles.create_account}>
            You don&apos;t have an account yet? <a href="#">Create one here!</a>
          </label>
        </div> */}
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
  closeModal: appActions.closeModal,
  emitter: socketActions.emitter,
  updatedUser: userActions.updatedUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousLoginModal);
