import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addMessage,
  addListener,
  emitMessage,
  removeListener
} from "store/actions";
import { Button, TextInput } from "components/Generic";
import ChatMessage from "./ChatMessage/ChatMessage";
import * as Styled from "./ChatPanel.styled";

const ChatPanel = ({ chat, userId }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState(``);
  const getNewMessage = useCallback(
    newMessage => {
      dispatch(addMessage(newMessage));
    },
    [dispatch]
  );
  const postNewMessage = useCallback(() => {
    dispatch(
      emitMessage({ event: `sendingMessage`, data: { message: newMessage } })
    );
    setNewMessage(``);
  }, [dispatch, newMessage]);
  const onEnter = useCallback(
    event => {
      if (event.key === `Enter`) {
        postNewMessage();
      }
    },
    [postNewMessage]
  );
  useEffect(() => {
    dispatch(addListener({ event: `newChatMessage`, handler: getNewMessage }));
    return () => dispatch(removeListener(`newChatMessage`));
  }, [dispatch, getNewMessage]);
  return (
    <Styled.Container>
      <Styled.Messages>
        {chat.map(msg => (
          <ChatMessage
            key={msg.msgId}
            message={msg.message}
            author={msg.author}
            color={msg.color}
            timeStamp={msg.timeStamp}
            isMine={msg.authorId === userId}
          />
        ))}
      </Styled.Messages>
      <Styled.InputContainer>
        <TextInput
          id="chat"
          name="chat"
          onChange={setNewMessage}
          onKeyDown={onEnter}
          placeholder="Type a message..."
          styles={Styled.MessageInput}
          value={newMessage}
        />
        <Button onClick={postNewMessage} styles={Styled.SendButton}>
          <FontAwesomeIcon color="white" icon="paper-plane" />
        </Button>
      </Styled.InputContainer>
    </Styled.Container>
  );
};

ChatPanel.propTypes = {
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      message: PropTypes.string.isRequired,
      timeStamp: PropTypes.number.isRequired
    })
  ),
  userId: PropTypes.string.isRequired
};

const mapStateToProps = ({ room: { chat }, user: { userId } }) => {
  return {
    chat,
    userId
  };
};

export default connect(mapStateToProps)(ChatPanel);
