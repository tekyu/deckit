import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { emitter } from "store/actions";
import selectActiveRoomId from "store/selectors/selectActiveRoomId";
import * as Styled from "./ChatControls.styled";

const ChatControls = () => {
  const activeRoomId = useSelector(selectActiveRoomId);
  const dispatch = useDispatch();
  const sendMessageHandler = message => {
    dispatch(emitter(`sendingMessage`, { activeRoomId, message }));
  };

  return (
    <Styled.Container>
      <Styled.Input name="message" handler={sendMessageHandler} />
      <Styled.Icon onClick={sendMessageHandler} />
    </Styled.Container>
  );
};
export default ChatControls;
