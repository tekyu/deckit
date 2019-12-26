import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import sillyname from "sillyname";
import {
  updateAnonUser,
  closeModal,
  emitter,
  UPDATE_ANON_USER
} from "store/actions";
import { Button, TextInput } from "components/Generic";
import * as Styled from "./AnonymousLogin.styled";

const AnonymousLogin = ({ emitter, updateAnonUser }) => {
  const [username, setUsername] = useState(sillyname());
  const submitHandler = useCallback(
    event => {
      event.preventDefault();
      emitter(UPDATE_ANON_USER, { username }, data => {
        // update user on this side
        updateAnonUser(data);
        emitter(`newConnectedPlayer`, data);
      });
    },
    [emitter, updateAnonUser, username]
  );

  return (
    <Styled.Form onSubmit={submitHandler}>
      <TextInput
        id="username"
        name="Username"
        onChange={setUsername}
        placeholder="Type your username here"
        value={username}
      />
      <Button preset="primary" styles={Styled.LoginButton} type="submit">
        Login
      </Button>
      <Styled.CreateAccount>
        {/* TODO Create account redirect */}
        Don&apos;t have an account yet? <a href="/">Create one here!</a>
      </Styled.CreateAccount>
    </Styled.Form>
  );
};

AnonymousLogin.propTypes = {
  emitter: PropTypes.func.isRequired,
  updateAnonUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { user } }) => {
  return {
    user
  };
};

const mapDispatchToProps = {
  closeModal,
  emitter,
  updateAnonUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousLogin);
