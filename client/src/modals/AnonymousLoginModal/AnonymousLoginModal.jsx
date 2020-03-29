import React, { Component } from "react";
import {
  updatedUser,
  closeModal,
  emitter,
  UPDATE_ANON_USER
} from "store/actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import sillyname from "sillyname";

import styled from "styled-components";
import * as styles from "./AnonymousLoginModal.module.scss";

const StyledButton = styled(Button)`
  border: 0;
  border-radius: 3px;
  background: transparent;
  background-image: linear-gradient(
    35deg,
    #2ac9db -10%,
    #009bff 47%,
    #cf77f3 130%
  );
  font-size: 14px;
  padding: 16px 32px;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin: 40px 0 20px 0;
  width: 100%;
  transition: all 0.3s ease-out;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.28);
  &:focus,
  &:hover,
  &:active {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.28);
  }
`;

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
          <p>{"Let's have fun!"}</p>
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

            <StyledButton variant="contained" color="primary" type="submit">
              Choose
            </StyledButton>
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
  closeModal,
  emitter,
  updatedUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousLoginModal);
