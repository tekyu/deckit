import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { userSelectors } from 'store/selectors';
import { Element, scroller } from 'react-scroll';
import ChatElement from '../ChatElement/ChatElement';
import * as Styled from './ChatList.styled';

type MessageType = {
  id: string;
  ownerId: string;
  [x: string]: any;
}

interface IChatList {
  messages: MessageType[]
}
const ChatList = ({ messages }: IChatList): JSX.Element => {
  const userId = useSelector(userSelectors.userId);
  const [messageList, setMessageList] = useState([]);

  const scrollToBottom = () => {
    scroller.scrollTo('scroll-to-bottom', {
      duration: 400,
      delay: 0,
      smooth: 'easeInOutQuart',
      container: 'scroll-chat-container',
    });
  };

  useEffect(() => {
    const newMessages = messages.map(({ id, ownerId, ...message }: MessageType): JSX.Element => (
      <ChatElement
        id={id}
        ownerId={ownerId}
        isMine={userId === ownerId}
        {...message}
        key={id}
      />
    ));
    // @ts-ignore
    setMessageList(newMessages);
  }, [messages, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Styled.Container name="scroll-chat-container" id="scroll-chat-container">
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
