import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "store/actions";
import * as styles from "./AccountBox.module.scss";

class AccountBox extends Component {
  state = {
    userData: {
      _id: `ewrewr34w4532324e3wed23321432erw`,
      avatar: `https://via.placeholder.com/200x150`,
      name: `Annabel Maverick`
    }
  };

  openModalHandler = ev => {
    const formName = ev.currentTarget.name;
    this.props.openModal(formName);
  };

  getAuthFalse() {
    console.log(`getAuthFalse`, this.props);
    if (this.props.user.user) {
      return this.renderUser();
    }
    return (
      <React.Fragment>
        <button
          onClick={this.openModalHandler}
          name="register"
          type="button"
          className="button--secondary"
        >
          Join
        </button>
        <button
          onClick={this.openModalHandler}
          type="button"
          name="login"
          className="button--primary"
        >
          Login
        </button>
      </React.Fragment>
    );
  }

  getAnonymousUserDropdown() {
    // return ()
  }

  getRegisteredUserDropdown() {
    return (
      <div className={styles.dropdown}>
        <ul>
          <li>
            <NavLink to="/account/:">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Profile</NavLink>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    );
  }

  renderDropdown() {
    if (this.props.auth) {
      return this.getRegisteredUserDropdown();
    }
    return this.getAnonymousUserDropdown();
  }

  renderUser() {
    return (
      <div className={styles.container}>
        <div className={styles.display}>
          <div className={styles.avatar}>
            <img
              src={
                this.props.auth
                  ? this.state.userData.avatar
                  : `https://via.placeholder.com/40x40`
              }
              alt="Users avatar"
            />
          </div>
          <span className={styles.name}>{this.props.user.user.username}</span>
        </div>
        {this.renderDropdown()}
      </div>
    );
  }

  getAuthTrue() {
    const { user } = this.props;
    if (!user) {
      return false;
    }
    return this.renderUser();
  }

  render() {
    return (
      <div className={styles.accountBox_container}>
        {this.props.auth ? this.getAuthTrue() : this.getAuthFalse()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};

const mapDispatchToProps = {
  openModal
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountBox);
