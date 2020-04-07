import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { listener, emitter } from "store/actions";
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

const ChatPanel = ({ activeRoomId, emitter, listener }) => {
  const [messages, setMessages] = useState([]);
  const messageList = useCallback(() => {
    emitter(`getChatHistory`, { activeRoomId }, messages => {
      setMessages(messages);
    });
  }, [activeRoomId, emitter]);
  useEffect(() => {
    listener(`incomingChatMessage`, ({ data: { ...newMessage } }) => {
      setMessages(messages => [...messages, newMessage]);
    });
  }, []);
  useEffect(() => {
    messageList();
  }, []);

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

const mapDispatchToProps = { emitter, listener };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPanel);
