import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { listener, emitter } from "store/actions/socket";
import ChatElement from "./ChatElement/ChatElement";
import ChatControls from "./ChatControls/ChatControls";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Messages = styled.div`
  overflow-y: auto;
`;

const ChatPanel = ({ activeRoomId, emitter }) => {
  const [messages, setMessages] = useState([]);
  const messageList = useCallback(() => {
    emitter(`getChatHistory`, { activeRoomId }, messages => {
      setMessages(messages);
    });
  }, [activeRoomId, emitter]);
  useEffect(() => {
    messageList();
  }, [messageList]);
  const getMessages = () => {
    // const { user: { id = "" } = {} } = this.props;
    return messages.map(({ id, ownerId, ...message }) => {
      return (
        <ChatElement isMine={ownerId === `5qqe43`} {...message} key={id} />
      );
    });
  };

  return (
    <Container>
      <Messages>{getMessages()}</Messages>
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
