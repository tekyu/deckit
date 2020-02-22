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
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledChatList = styled(ChatList)`
  overflow-y: auto;
`;

const ChatPanel = ({ activeRoomId, emitter, listener }) => {
  const [messages, setMessages] = useState([]);
  const messageList = useCallback(() => {
    emitter(`getChatHistory`, { activeRoomId }, messages => {
      setMessages(messages);
    });
  }, [activeRoomId, emitter]);
  useEffect(() => {
    listener(`incomingChatMessage`, newMessage => {
      setMessages(messages => [...messages, newMessage]);
    });
  }, []);
  useEffect(() => {
    messageList();
  }, []);

  return (
    <Container>
      {messages && <StyledChatList messages={messages} />}
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
