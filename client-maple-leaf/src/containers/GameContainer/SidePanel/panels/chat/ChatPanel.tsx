import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { socketActions } from 'store/actions';
import { activeRoomId } from 'store/room/roomSelectors';
import { IChatElement } from 'containers/GameContainer/SidePanel/panels/chat/ChatElement/ChatElement';
import ChatControls from './ChatControls/ChatControls';
import ChatList from './ChatList/ChatList';
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 1px;
`;

const ChatPanel = (): JSX.Element => {
  const roomId = useSelector(activeRoomId);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  const messageList = useCallback(() => {
    dispatch(
      socketActions.emitter('getChatHistory', { roomId }, (messages: IChatElement) => {
        // @ts-ignore
        setMessages(messages);
      }),
    );
  }, [roomId, dispatch]);

  useEffect(() => {
    dispatch(
      socketActions.listener(
        'incomingChatMessage',
        ({ data: { ...newMessage } }) => {
          // @ts-ignore
          setMessages((messages) => [...messages, newMessage]);
        },
      ),
    );
  }, [dispatch]);

  useEffect(() => {
    messageList();
  }, [messageList]);

  return (
    <Container>
      {messages && <ChatList messages={messages} />}
      <ChatControls />
    </Container>
  );
};

export default ChatPanel;
