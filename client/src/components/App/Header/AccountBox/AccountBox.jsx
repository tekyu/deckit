import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, openModal } from "store/actions";
import { Button } from "components/Generic";
import * as Styled from "./AccountBox.styled";

const AccountBox = ({ isAuthorized, logout, openModal, username }) => {
  const openModalHandler = useCallback(
    e => {
      openModal(e.target.name);
    },
    [openModal]
  );
  return (
    <Styled.Container>
      {username}
      {isAuthorized ? (
        <Button onClick={logout} preset="primary">
          Logout
        </Button>
      ) : (
        <>
          <Button onClick={openModalHandler} name="register" preset="secondary">
            Register
          </Button>
          <Button onClick={openModalHandler} name="login" preset="primary">
            Login
          </Button>
        </>
      )}
    </Styled.Container>
  );
};

AccountBox.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { isAuthorized, username } = state.user;
  return {
    isAuthorized,
    username
  };
};

const mapDispatchToProps = {
  logout,
  openModal
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountBox);
