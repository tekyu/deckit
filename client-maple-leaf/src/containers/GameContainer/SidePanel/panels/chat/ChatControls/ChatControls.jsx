import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketActions } from 'store/actions';
import { roomSelectors } from 'store/selectors';
import * as Styled from './ChatControls.styled';

const ChatControls = () => {
  const activeRoomId = useSelector(roomSelectors.activeRoomId);
  const dispatch = useDispatch();
  const sendMessageHandler = (message) => {
    dispatch(
      socketActions.emitter('sendingMessage', { activeRoomId, message }),
    );
  };

  return (
    <Styled.Container>
      <Styled.Input name="message" handler={sendMessageHandler} />
      <Styled.Icon onClick={sendMessageHandler} />
    </Styled.Container>
  );
};
export default ChatControls;
