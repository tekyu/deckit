import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import selectActiveRoomId from "../../store/selectors/selectActiveRoomId";
import { sendHint } from "../../store/deckit/deckitActions";

const StyledHintForm = styled(Form)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  text-align: center;
  padding: 20px;
`;

const StyledField = styled(Field)`
  border: 0;
  background: transparent;
  padding: 7px;
  font-size: 18px;
  text-align: center;
  outline: none;
  position: relative;
  width: 100%;
`;

const StyledHintContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const StyledHintButtonContainer = styled.div`
  margin-right: 10px;
  position: relative;
  display: flex;
  background: #fff;
  width: 100%;
  box-shadow: 0px 10px 30px -15px rgba(0, 0, 0, 0.28);
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-image: linear-gradient(
      40deg,
      #2ac9db 0%,
      #009bff 47%,
      #cf77f3 100%
    );
  }
`;

const StyledHintButton = styled(Button)`
  min-width: 130px;
  padding: 16px 24px;
  white-space: nowrap;
  border-radius: 3px;
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
`;

const HintInput = () => {
  const dispatch = useDispatch();
  const activeRoomId = useSelector(selectActiveRoomId);

  return (
    <Formik
      initialValues={{
        hint: ""
      }}
      onSubmit={({ hint }) => {
        dispatch(sendHint({ activeRoomId, hint }));
      }}
    >
      {() => {
        return (
          <StyledHintForm>
            <StyledHintContainer>
              <StyledHintButtonContainer>
                <StyledField
                  name="hint"
                  type="text"
                  placeholder="Place your hint in here"
                />
              </StyledHintButtonContainer>
              <StyledHintButton
                variant="contained"
                color="primary"
                type="submit"
              >
                Post hint
              </StyledHintButton>
            </StyledHintContainer>
          </StyledHintForm>
        );
      }}
    </Formik>
  );
};

export default HintInput;
