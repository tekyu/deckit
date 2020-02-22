import React, { Component } from "react";
import { loginUser, closeModal } from "store/actions";
import { connect } from "react-redux";
import * as styles from "./LoginModal.module.scss";

class LoginModal extends Component {
  state = {
    username: ``,
    password: ``,
    formError: null,
    errors: {
      empty: `It seems like you forgot to fill your`,
      401: `Oops! It looks like you misspelled your username or password`
    }
  };

  inputOnChangeHandler = event => {
    const change = {
      [event.target.name]: event.target.value
    };
    this.setState(() => {
      return change;
    });
  };

  submitLoginHandler = event => {
    event.preventDefault();
    const { loginUser } = this.props;
    const [username, password] = [this.state.username, this.state.password];
    if (!username || !password) {
      this.setState((state, props) => {
        return {
          formError:
            state.errors.empty + (!username ? " username" : " password")
        };
      });
      return false;
    }
    loginUser(username, password);
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.auth !== prevProps.auth) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className={styles.modal_container}>
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
            <label className={styles.password_recovery}>
              Can&apos;t remember your password? <a href="#">Click here!</a>
            </label>
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

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispatchToProps = {
  loginUser,
  closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
