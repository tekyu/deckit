import React from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { deckitActions } from "store/actions";
import { roomSelectors } from "store/selectors";
import * as Styled from "./HintInput.styled";

const HintInput = () => {
  const dispatch = useDispatch();
  const activeRoomId = useSelector(roomSelectors.activeRoomId);

  return (
    <Formik
      initialValues={{
        hint: ``,
      }}
      onSubmit={({ hint }) => {
        dispatch(deckitActions.sendHint({ activeRoomId, hint }));
      }}
    >
      {() => (
        <Styled.HintForm>
          <Styled.Container>
            <Styled.ButtonContainer>
              <Styled.HintField
                name="hint"
                type="text"
                placeholder="Place your hint in here"
              />
            </Styled.ButtonContainer>
            <Styled.HintButton
              variant="contained"
              color="primary"
              type="submit"
            >
              Post hint
            </Styled.HintButton>
          </Styled.Container>
        </Styled.HintForm>
      )}
    </Formik>
  );
};

export default HintInput;
