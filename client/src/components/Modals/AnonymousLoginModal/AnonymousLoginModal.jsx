import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import sillyname from "sillyname";
import { Button, TextInput } from "components/Generic";
import { closeModal, updateAnonymousUsername } from "store/actions";
import * as Styled from "./AnonymousLogin.styled";

const AnonymousLogin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(sillyname());
  const submitHandler = useCallback(
    event => {
      event.preventDefault();
      dispatch(updateAnonymousUsername({ username }));
      dispatch(closeModal());
    },
    [dispatch, username]
  );

  return (
    <Styled.Form onSubmit={submitHandler}>
      <TextInput
        id="username"
        name="Username"
        onChange={setUsername}
        value={username}
      />
      <Button preset="primary" styles={Styled.LoginButton} type="submit">
        Enter
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
  updateUser: PropTypes.func.isRequired
};

export default AnonymousLogin;
