import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { socketActions } from "store/actions";
import ChatControls from "./ChatControls/ChatControls";
import ChatList from "./ChatList/ChatList";
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

const ChatPanel = ({ activeRoomId }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const messageList = useCallback(() => {
    dispatch(
      socketActions.emitter(`getChatHistory`, { activeRoomId }, messages => {
        setMessages(messages);
      })
    );
  }, [activeRoomId, dispatch]);
  useEffect(() => {
    dispatch(
      socketActions.listener(
        `incomingChatMessage`,
        ({ data: { ...newMessage } }) => {
          setMessages(messages => [...messages, newMessage]);
        }
      )
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

const mapStateToProps = ({ user: { user }, room: { activeRoomId } }) => {
  return {
    user,
    activeRoomId
  };
};

export default connect(mapStateToProps)(ChatPanel);
