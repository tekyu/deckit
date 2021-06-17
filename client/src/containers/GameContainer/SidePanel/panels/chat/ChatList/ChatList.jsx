import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userSelectors } from "store/selectors";
import { Element, scroller } from "react-scroll";
import ChatElement from "../ChatElement/ChatElement";
import * as Styled from "./ChatList.styled";

const ChatList = ({ messages }) => {
  const userId = useSelector(userSelectors.userId);
  const [messageList, setMessageList] = useState([]);

  const scrollToBottom = () => {
    scroller.scrollTo(`scroll-to-bottom`, {
      duration: 400,
      delay: 0,
      smooth: `easeInOutQuart`,
      container: `scroll-chat-container`,
    });
  };

  useEffect(() => {
    setMessageList(() => messages.map(({ id, ownerId, ...message }) => (
      <ChatElement
        id={id}
        ownerId={ownerId}
        isMine={userId === ownerId}
        {...message}
        key={id}
      />
    )));
  }, [messages, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Styled.Container id="scroll-chat-container">
      {messageList}
      <Element name="scroll-to-bottom" />
    </Styled.Container>
  );
};

ChatList.defaultProps = {
  messages: [],
};

ChatList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string,
    message: PropTypes.string,
    ownerId: PropTypes.string,
    timestamp: PropTypes.number,
  })),
};

export default memo(ChatList);
