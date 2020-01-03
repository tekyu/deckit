import React, { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { logout, openModal } from "store/actions";
import { LOGIN_MODAL, REGISTER_MODAL } from "components/Modals";
import { Button } from "components/Generic";
import * as Styled from "./AccountBox.styled";

const AccountBox = ({ isAuthorized, username }) => {
  const dispatch = useDispatch();
  const openModalHandler = useCallback(
    e => {
      dispatch(openModal({ modalType: e.target.name }));
    },
    [dispatch]
  );
  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <Styled.Container>
      {username}
      {isAuthorized ? (
        <Button onClick={logoutHandler} preset="primary">
          Logout
        </Button>
      ) : (
        <>
          <Button
            onClick={openModalHandler}
            name={REGISTER_MODAL}
            preset="secondary"
          >
            Register
          </Button>
          <Button
            onClick={openModalHandler}
            name={LOGIN_MODAL}
            preset="primary"
          >
            Login
          </Button>
        </>
      )}
    </Styled.Container>
  );
};

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
