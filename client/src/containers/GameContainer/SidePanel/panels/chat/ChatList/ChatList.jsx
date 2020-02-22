import React, { memo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import selectUserId from "store/selectors/selectUserId";
import ChatElement from "../ChatElement/ChatElement";

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ChatList = ({ messages }, p) => {
  const userId = useSelector(selectUserId);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const messageList = messages.map(({ id, ownerId, ...message }) => {
    return <ChatElement isMine={userId === ownerId} {...message} key={id} />;
  });
  return (
    <Container>
      {messageList}
      <div ref={messagesEndRef}></div>
    </Container>
  );
};

export default memo(ChatList);
