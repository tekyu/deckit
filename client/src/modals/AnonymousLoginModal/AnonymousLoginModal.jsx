import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import sillyname from "sillyname";
import { appActions, userActions } from "store/actions";
import { userSelectors } from "store/selectors";
import * as Styled from "./AnonymousLoginModal.styled";

const AnonymousLoginModal = () => {
  const user = useSelector(userSelectors.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(sillyname());

  useEffect(() => {
    if (user) {
      dispatch(appActions.closeModal());
    }
  }, [dispatch, user]);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(userActions.updatedUser(username));
    },
    [dispatch, username],
  );

  return (
    <form onSubmit={submitHandler}>
      <Styled.InputGroup>
        <TextField
          name="username"
          label="Nickname"
          placeholder="Type your nickname here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Styled.InputGroup>
      <Styled.SubmitButton variant="contained" color="primary" type="submit">
        Choose
      </Styled.SubmitButton>
    </form>
  );
};

export default AnonymousLoginModal;
