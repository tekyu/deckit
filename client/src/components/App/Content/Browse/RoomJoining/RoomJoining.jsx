import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import $Button from "../../../../Generic/Button/Button.styled";
import { emitter } from "../../../../../store/socket/socketActions";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 80px;
`;

const StyledCreateButton = styled($Button)`
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 3px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 6px 0;
  opacity: 0.6;
  font-size: 14px;
`;

const StyledField = styled(Field)`
  border: 0;
  background: transparent;
  padding: 7px;
  font-size: 18px;
  text-align: center;
  outline: none;
  position: relative;
`;

const StyledJoinContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const StyledJoinFieldContainer = styled.div`
  margin-right: 10px;
  position: relative;
  display: flex;
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

const StyledJoinButton = styled($Button)`
  padding: 16px 32px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
`;

const StyledSeparator = styled.div`
  margin: 20px 0;
  font-size: 18px;
`;

const RoomJoining = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <StyledContainer>
      <div>
        <NavLink to="/create">
          <StyledCreateButton>Create your game</StyledCreateButton>
        </NavLink>
      </div>
      <StyledSeparator>or</StyledSeparator>
      <Formik
        validate={({ id }) => {
          if (!id) {
            return { id: "Id cannot be empty" };
          }
        }}
        initialValues={{
          id: ""
        }}
        onSubmit={({ id }, actions) => {
          // check for room
          // if cannot join get error
          dispatch(
            emitter("CHECK_FOR_ROOM", { id }, roomFound => {
              if (roomFound) {
                history.push(`/game/${id}`);
              } else {
                actions.setErrors({
                  id: `Game doesn't exist or has already started`
                });
              }
            })
          );
          // if can join push to history
        }}
      >
        <StyledForm>
          <StyledJoinContainer>
            <StyledJoinFieldContainer>
              <StyledField
                name="id"
                type="text"
                placeholer="Type room ID here"
              />
            </StyledJoinFieldContainer>
            <StyledJoinButton type="submit">Join</StyledJoinButton>
          </StyledJoinContainer>
          <StyledErrorMessage name="id" />
        </StyledForm>
      </Formik>
    </StyledContainer>
  );
};

export default RoomJoining;
