import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import sillyname from "sillyname";
import { updateAnonUser, closeModal } from "store/actions";
import { Button, TextInput } from "components/Generic";
import * as Styled from "./AnonymousLogin.styled";

const AnonymousLogin = ({}) => {
  const [username, setUsername] = useState(sillyname());
  const submitHandler = useCallback(event => {
    event.preventDefault();
  }, []);

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
  emitter: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { user } }) => {
  return {
    user
  };
};

const mapDispatchToProps = {
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(AnonymousLogin);
