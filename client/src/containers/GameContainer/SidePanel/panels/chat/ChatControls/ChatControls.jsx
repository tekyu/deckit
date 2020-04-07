import React, { Component, useState } from "react";
import { inputOnChangeHandler } from "utils/genericInput";
import styled from "styled-components";
import { connect, useSelector, useDispatch } from "react-redux";
import { emitter } from "store/actions";
import SendIcon from "@material-ui/icons/Send";
import selectActiveRoomId from "store/selectors/selectActiveRoomId";
import GenericInputHooks from "../../../../../../utils/genericInputHooks";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
`;

const StyledInput = styled(GenericInputHooks)`
  border-radius: 18px;
  padding: 6px 8px;
  border: 1px solid rgba(0, 0, 0, 0.28);
  width: 100%;
  transition: border 0.3s ease-in-out;
  margin-right: 12px;
  outline: none;
  &:focus,
  &:active,
  &:hover {
    border: 1px solid #009bff;
  }
`;

const StyledIcon = styled(SendIcon)`
  color: #009bff;
`;

const ChatControls = () => {
  const activeRoomId = useSelector(selectActiveRoomId);
  const dispatch = useDispatch();
  const sendMessageHandler = message => {
    dispatch(emitter(`sendingMessage`, { activeRoomId, message }));
  };

  return (
    <Container>
      <StyledInput name="message" handler={sendMessageHandler} />
      <StyledIcon onClick={sendMessageHandler} />
      {/* <button onClick={sendMessageHandler}></button> */}
    </Container>
  );
};
export default ChatControls;
