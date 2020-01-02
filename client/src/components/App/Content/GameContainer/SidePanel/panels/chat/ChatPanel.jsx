import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addListener } from "store/actions";
import { Button, TextInput } from "components/Generic";
import ChatMessage from "./ChatMessage/ChatMessage";
import * as Styled from "./ChatPanel.styled";

const messages = [
  { message: `lorem ipsum sripsum`, author: `pafiszon`, color: `green` },
  { message: `imbo bimbo akimbo`, author: `maupiszon`, color: `magenta` },
  { message: `lakukaracza`, author: `el maraczi`, color: `yellow` },
  { message: `co tu sie`, author: `pedro`, color: `cyan`, isMine: true },
  { message: `jajeco`, author: `Ferdek`, color: `orange` }
];

const ChatPanel = ({ chat }) => {
  const [newMessage, setNewMessage] = useState(``);
  const messageList = useCallback(() => {
    // emitter(`getChatHistory`, { activeRoomId }, messages => {
    //   setMessages(messages);
    // });
  }, []);
  useEffect(() => {
    messageList();
  }, [messageList]);
  return (
    <Styled.Container>
      <Styled.Messages>
        <ChatMessage message="lorem ipsum " author="pafiszon" color="red" />
        {messages.map(msg => (
          <ChatMessage
            key={msg.message}
            message={msg.message}
            author={msg.author}
            color={msg.color}
            isMine={msg.isMine}
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
        <Button styles={Styled.SendButton}>
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
  )
};

const mapStateToProps = ({ user: { user }, room: { chat } }) => {
  return {
    chat,
    user
  };
};

const mapDispatchToProps = { addListener };
export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
