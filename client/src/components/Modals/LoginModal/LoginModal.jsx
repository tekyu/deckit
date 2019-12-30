import React, { useState } from "react";
import { loginUser, closeModal } from "store/actions";
import { connect } from "react-redux";
import { Button, TextInput } from "components/Generic";
import * as Styled from "./LoginModal.styled";

const LoginModal = () => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const submitLoginHandler = event => {
    event.preventDefault();
    loginUser(`test`, `test`) /* TODO Login */
      .then()
      .catch(error => {
        throw error;
      });
  };

  return (
    <Styled.Form onSubmit={submitLoginHandler}>
      <TextInput
        id="username"
        name="Username"
        onChange={setUsername}
        value={username}
      />
      <TextInput
        id="password"
        name="Password"
        onChange={setPassword}
        type="password"
        value={password}
      />
      <Styled.PasswordRecovery>
        {/* TODO Password recovery */}
        Can&apos;t remember your password? <a href="/">Click here!</a>
      </Styled.PasswordRecovery>
      <Button preset="primary" styles={Styled.LoginButton} type="submit">
        Login
      </Button>
      <Styled.CreateAccount>
        {/* TODO Create account */}
        Don&apos;t have an account yet? <a href="/">Create one here!</a>
      </Styled.CreateAccount>
    </Styled.Form>
  );
};

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
