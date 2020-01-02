import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { addListener } from "store/actions";
import ChatElement from "./ChatElement/ChatElement";
import ChatControls from "./ChatControls/ChatControls";
import * as Styled from "./ChatPanel.styled";

const ChatPanel = ({ activeRoomId }) => {
  const [messages, setMessages] = useState([]);
  const messageList = useCallback(() => {
    // emitter(`getChatHistory`, { activeRoomId }, messages => {
    //   setMessages(messages);
    // });
  }, []);
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
    <Styled.Container>
      <Styled.Messages>{getMessages()}</Styled.Messages>
      <ChatControls />
    </Styled.Container>
  );
};

const mapStateToProps = ({ user: { user }, room: { activeRoomId } }) => {
  return {
    user,
    activeRoomId
  };
};

const mapDispatchToProps = { addListener };
export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
