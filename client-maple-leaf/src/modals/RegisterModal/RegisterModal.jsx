/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './RegisterModal.module.scss';
import { registerUser } from '../../store/user/userActions';
import { closeModal } from '../../store/app/appActions';

class RegisterModal extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    formError: null,
    errors: {
      empty: 'It seems like you forgot to fill your',
      401: 'Oops! It looks like you misspelled your username or password',
      misspelledPass: 'Passwords are not the same',
    },
  };

  inputOnChangeHandler = (event) => {
    const change = {
      [event.target.name]: event.target.value,
    };
    this.setState(() => change);
  };

  submitRegisterHandler = (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    const { registerUser } = this.props;
    if (!username || !password) {
      this.setState((state) => ({
        formError: `${state.errors.empty} ${!username ? ' username' : ' password'
        }`,
      }));
      return false;
    }
    if (password !== confirmPassword) {
      this.setState((state) => ({
        formError: state.errors.misspelledPass,
      }));
      return false;
    }
    registerUser(username, password);
    return false;
  };

  render() {
    return (
      // <div className={styles.modal_backdrop}>
      <div className={styles.modal_container}>
        {/* <div className={styles.modal_close} /> */}
        <div className={styles.modal_header}>
          <i className={styles.ikontest} />
          <h2>Register</h2>
          <p>Lets have fun!</p>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={this.submitRegisterHandler}>
            <div className={styles.input_group}>
              <div className={styles.input_label} htmlFor="username">
                Username
              </div>
              <input
                className={styles.input_input}
                type="text"
                name="username"
                placeholder="Type your username here"
                onChange={this.inputOnChangeHandler}
              />
            </div>
            <div className={styles.input_group}>
              <div className={styles.input_label} htmlFor="password">
                Password
              </div>
              <input
                className={styles.input_input}
                type="password"
                name="password"
                placeholder="Type your password here"
                onChange={this.inputOnChangeHandler}
              />
            </div>
            <div className={styles.input_group}>
              <div className={styles.input_label} htmlFor="confirmPassword">
                Confirm your password
              </div>
              <input
                className={styles.input_input}
                type="password"
                name="confirmPassword"
                placeholder="Type your password here"
                onChange={this.inputOnChangeHandler}
              />
            </div>

            {this.state.formError ? (
              <div className={styles.form_error}>{this.state.formError}</div>
            ) : null}

            <button type="submit">Register</button>
            <div className={styles.password_recovery}>
              Can&apos;t remember your password?
              {' '}
              {/* <a href="#">Click here!</a> */}
            </div>
          </form>
        </div>
        <div className={styles.modal_footer}>
          <div className={styles.create_account}>
            Already have an account?
            {' '}
            {/* <a href="#">Create one here!</a> */}
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

const mapDispatchToProps = {
  registerUser,
  closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(RegisterModal);
