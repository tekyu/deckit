import React, { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { logout, openModal } from "store/actions";
import { LOGIN_MODAL, REGISTER_MODAL } from "components/Modals";
import { Button } from "components/Generic";
import * as Styled from "./AccountBox.styled";

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
    // console.log(`getAuthFalse`, this.props);
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
    return (
      <div className={styles.dropdown}>
        <ul>
          <li>
            <button
              onClick={this.openModalHandler}
              name="login"
              type="button"
              className="button--secondary"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={this.openModalHandler}
              name="register"
              type="button"
              className="button--primary"
            >
              Join
            </button>
          </li>
        </ul>
      </div>
    );
  }

  getRegisteredUserDropdown() {
    return (
      <div className={styles.dropdown}>
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink>
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
    const {
      user: { auth }
    } = this.props;
    if (auth) {
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

AccountBox.defaultProps = {
  username: ``
};

AccountBox.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  username: PropTypes.string
};

const mapStateToProps = state => {
  const { isAuthorized, username } = state.user;
  return {
    isAuthorized,
    username
  };
};

export default connect(mapStateToProps)(AccountBox);
