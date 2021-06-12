import React, { Component } from "react";
import axios from "utils/axios";
import * as styles from "./LoginForm.module.scss";

class LoginForm extends Component {
  state = {
    username: ``,
    password: ``,
    formError: null,
    errors: {
      empty: `It seems like you forgot to fill your`,
      401: `Oops! It looks like you misspelled your username or password`,
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
          state.errors.empty + (!username ? ` username` : ` password`),
      }));
      return false;
    }
    axios
      .post(`/api/login`, {
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
          state.errors.empty + (!username ? ` username` : ` password`),
      }));
      return false;
    }
    axios
      .post(`/register`, {
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
            <h2>Login</h2>
            <p>Lets have fun!</p>
          </div>
          <div className={styles.modal_body}>
            <form onSubmit={this.submitLoginHandler}>
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
              {this.state.formError ? (
                <div className={styles.form_error}>{this.state.formError}</div>
              ) : null}

              <button type="submit">Login</button>
              <span className={styles.password_recovery}>
                Can&apos;t remember your password?
                {` `}
                <a href="/forgot">Click here!</a>
              </span>
            </form>
          </div>
          <div className={styles.modal_footer}>
            <span className={styles.create_account}>
              You don&apos;t have an account yet?
              {` `}
              <a href="/create">Create one here!</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
