import React from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveRoomId } from "store/selectors";
import { sendHint } from "store/deckit/deckitActions";
import * as Styled from "./HintInput.styled";

const HintInput = () => {
  const dispatch = useDispatch();
  const activeRoomId = useSelector(selectActiveRoomId);

  return (
    <Formik
      initialValues={{
        hint: ``
      }}
      onSubmit={({ hint }) => {
        dispatch(sendHint({ activeRoomId, hint }));
      }}
    >
      {() => {
        return (
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
        );
      }}
    </Formik>
  );
};

export default HintInput;
