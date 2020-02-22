import React, { Component, useState } from "react";
import { inputOnChangeHandler } from "utils/genericInput";
import styled from "styled-components";
import { connect, useSelector, useDispatch } from "react-redux";
import { emitter } from "store/actions";
import selectActiveRoomId from "store/selectors/selectActiveRoomId";
import GenericInputHooks from "../../../../../../utils/genericInputHooks";

const Container = styled.div`
  display: flex;
`;

const ChatControls = () => {
  const activeRoomId = useSelector(selectActiveRoomId);
  const dispatch = useDispatch();
  const sendMessageHandler = message => {
    dispatch(emitter(`sendingMessage`, { activeRoomId, message }));
  };

  return (
    <Container>
      <div>settings</div>
      <GenericInputHooks name="message" handler={sendMessageHandler} />
      <button onClick={sendMessageHandler}></button>
    </Container>
  );
};
export default ChatControls;
