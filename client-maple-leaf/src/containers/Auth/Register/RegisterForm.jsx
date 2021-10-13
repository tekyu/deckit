/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import axios from 'utils/axios';
import * as styles from './RegisterForm.module.scss';

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    formError: null,
    errors: {
      empty: 'It seems like you forgot to fill your',
      401: 'Oops! It looks like you misspelled your username or password',
    },
  };

  inputOnChangeHandler = (event) => {
    const change = {
      [event.target.name]: event.target.value,
    };
    this.setState(() => change);
  };

  submitLoginHandler = (event) => {
    event.preventDefault();
    const [username, password] = [this.state.username, this.state.password];
    if (!username || !password) {
      this.setState((state) => ({
        formError:
          state.errors.empty + (!username ? ' username' : ' password'),
      }));
      return false;
    }
    axios
      .post('/api/login', {
        username,
        password,
      })
      .then(() => { })
      .catch((error) => {
        this.setState((state) => ({
          formError: state.errors[error.response.status],
        }));
      });
    return false;
  };

  submitRegisterHandler = (event) => {
    event.preventDefault();
    const [username, password] = [this.state.username, this.state.password];
    if (!username || !password) {
      this.setState((state) => ({
        formError:
          state.errors.empty + (!username ? ' username' : ' password'),
      }));
      return false;
    }
    axios
      .post('/register', {
        username,
        password,
      })
      .then(() => { })
      .catch(() => { });
    return false;
  };

  render() {
    return (
      <div className={styles.modal_backdrop}>
        <div className={styles.modal_container}>
          <div className={styles.modal_close} />
          <div className={styles.modal_header}>
            <i className={styles.ikontest} />
            <h2>Register</h2>
            <p>Lets have fun!</p>
          </div>
          <div className={styles.modal_body}>
            <form onSubmit={this.submitRegisterHandler}>
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
              <div className={styles.input_group}>
                <label className={styles.input_label} htmlFor="password">
                  Password
                </label>
                <input
                  className={styles.input_input}
                  type="password"
                  name="password"
                  placeholder="Type your password here"
                  onChange={this.inputOnChangeHandler}
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.input_label} htmlFor="confirmPassword">
                  Confirm your password
                </label>
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
              <span className={styles.password_recovery}>
                Can&quots;t remember your password?
                {' '}
                <a href="/forgot">Click here!</a>
              </span>
            </form>
          </div>
          <div className={styles.modal_footer}>
            <span className={styles.create_account}>
              Already have an account?
              {' '}
              <a href="/createAccount">Create one here!</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
