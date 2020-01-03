import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMessage, addListener, emitMessage } from "store/actions";
import { Button, TextInput } from "components/Generic";
import ChatMessage from "./ChatMessage/ChatMessage";
import * as Styled from "./ChatPanel.styled";
import { removeListener } from "../../../../../../../store/socket/socketActions";

// const messages = [
//   { message: `lorem ipsum sripsum`, author: `pafiszon`, color: `green` },
//   { message: `imbo bimbo akimbo`, author: `maupiszon`, color: `magenta` },
//   { message: `lakukaracza`, author: `el maraczi`, color: `yellow` },
//   { message: `co tu sie`, author: `pedro`, color: `cyan`, isMine: true },
//   { message: `jajeco`, author: `Ferdek`, color: `orange` }
// ];

const ChatPanel = ({ addListener, addMessage, chat, emitMessage, userId }) => {
  const [newMessage, setNewMessage] = useState(``);
  const getNewMessage = useCallback(
    newMessage => {
      addMessage(newMessage);
    },
    [addMessage]
  );
  const postNewMessage = useCallback(() => {
    emitMessage(`sendingMessage`, { message: newMessage });
    setNewMessage(``);
  }, [emitMessage, newMessage]);
  useEffect(() => {
    addListener(`newChatMessage`, getNewMessage);
    return () => removeListener(`newChatMessage`);
  }, [addListener, getNewMessage]);
  return (
    <Styled.Container>
      <Styled.Messages>
        <ChatMessage message="lorem ipsum " author="pafiszon" color="red" />
        {chat.map(msg => (
          <ChatMessage
            key={msg.msgId}
            message={msg.message}
            author={msg.author}
            color={msg.color}
            isMine={msg.authorId === userId}
          />
        ))}
      </Styled.Messages>
      <Styled.InputContainer>
        <TextInput
          id="chat"
          name="chat"
          onChange={setNewMessage}
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
  addListener: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      message: PropTypes.string.isRequired,
      timeStamp: PropTypes.number.isRequired
    })
  ),
  emitMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = ({ room: { chat }, user: { userId } }) => {
  return {
    chat,
    userId
  };
};

const mapDispatchToProps = { addListener, addMessage, emitMessage };
export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
