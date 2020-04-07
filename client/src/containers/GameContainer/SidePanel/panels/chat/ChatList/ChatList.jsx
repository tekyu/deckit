import React, { memo, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import selectUserId from "store/selectors/selectUserId";
import { Element, scroller } from "react-scroll";
import ChatElement from "../ChatElement/ChatElement";

const Container = styled(Element)`
  flex: 1 1 1px;
  overflow-y: auto;
`;

const ChatList = ({ messages }, p) => {
  const userId = useSelector(selectUserId);
  const [messageList, setMessageList] = useState([]);

  const scrollToBottom = () => {
    scroller.scrollTo("scroll-to-bottom", {
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
      container: "scroll-chat-container"
    });
  };

  useEffect(() => {
    setMessageList(() =>
      messages.map(({ id, ownerId, ...message }) => {
        return (
          <ChatElement
            id={id}
            ownerId={ownerId}
            isMine={userId === ownerId}
            {...message}
            key={id}
          />
        );
      })
    );
  }, [messages, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Container id="scroll-chat-container">
      {messageList}
      <Element name="scroll-to-bottom"></Element>
    </Container>
  );
};

export default memo(ChatList);
