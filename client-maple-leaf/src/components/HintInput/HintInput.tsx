import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { sendHint } from 'store/deckit/deckitActions';
import { selectActiveRoomId } from 'store/room/roomSelectors';
import * as Styled from './HintInput.styled';

const HintInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const activeRoomId = useSelector(selectActiveRoomId);

  return (
    <Formik
      initialValues={{
        hint: '',
      }}
      onSubmit={({ hint }) => {
        dispatch(sendHint({ activeRoomId, hint }));
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
