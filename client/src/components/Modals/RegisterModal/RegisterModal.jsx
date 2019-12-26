import React, { useCallback, useState } from "react";
import axios from "utils/axios";
import { Button, TextInput } from "components/Generic";
import * as Styled from "./RegisterModal.styled";

const RegisterModal = () => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const submitRegisterHandler = useCallback(
    event => {
      event.preventDefault();
      if (!username || !password) {
        this.setState(state => {
          return {
            formError: `${state.errors.empty} ${
              !username ? ` username` : ` password`
            }`
          };
        });
        return false;
      }
      if (password !== confirmPassword) {
        this.setState(state => {
          return {
            formError: state.errors.misspelledPass
          };
        });
        return false;
      }
      axios
        .post(`/api/register`, {
          username,
          password
        })
        .then(() => {})
        .catch(error => {
          throw error;
        });
      return false;
    },
    [username, password, confirmPassword]
  );

  return (
    <Styled.Form onSubmit={submitRegisterHandler}>
      <TextInput
        id="username"
        name="Username"
        onChange={setUsername}
        placeholder="Type your username here"
        value={username}
      />
      <TextInput
        id="password"
        name="Password"
        onChange={setPassword}
        placeholder="Type your password here"
        type="password"
        value={password}
      />
      <TextInput
        id="confirmPassword"
        name="Confirm password"
        onChange={setConfirmPassword}
        placeholder="Type your password here"
        type="password"
        value={confirmPassword}
      />
      <Button preset="primary" styles={Styled.LoginButton} type="submit">
        Register
      </Button>
      <Styled.CreateAccount>
        {/* TODO Redirect to login */}
        Already have an account? <a href="/">Login here!</a>
      </Styled.CreateAccount>
    </Styled.Form>
  );
};

export default RegisterModal;
