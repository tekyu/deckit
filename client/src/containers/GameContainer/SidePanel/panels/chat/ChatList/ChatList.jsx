import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import selectUserId from "store/selectors/selectUserId";
import { Element, scroller } from "react-scroll";
import ChatElement from "../ChatElement/ChatElement";
import * as Styled from "./ChatList.styled";

const ChatList = ({ messages }) => {
  const userId = useSelector(selectUserId);
  const [messageList, setMessageList] = useState([]);

  const scrollToBottom = () => {
    scroller.scrollTo(`scroll-to-bottom`, {
      duration: 400,
      delay: 0,
      smooth: `easeInOutQuart`,
      container: `scroll-chat-container`
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
    <Styled.Container id="scroll-chat-container">
      {messageList}
      <Element name="scroll-to-bottom"></Element>
    </Styled.Container>
  );
};

export default memo(ChatList);
