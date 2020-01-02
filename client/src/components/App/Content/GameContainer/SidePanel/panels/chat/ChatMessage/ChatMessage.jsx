import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  display: flex;
  margin: 0.5em;
  ${({ isMine }) =>
    isMine &&
    `
    text-align:right;
  `}
`;

const Display = styled.div`
  position: relative;
  height: 100%;
  width: 40px;
  padding-right: 5px;
  margin-top: 16px;
  ${({ isMine }) =>
    isMine &&
    `
    display: none;
  `}
`;

const AvatarContainer = styled.div`
  background-color: lightGrey;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6em;
  height: 1.6em;
  padding: 0.5em;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  span {
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`;

const ColorIndicator = styled.span`
  position: absolute;
  display: block;
  width: 12px;
  height: 12px;
  bottom: 0px;
  right: 6px;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? `flex-end` : `flex-start`)}
  width: 100%;
`;

const Message = styled.p`
  width: auto;
  height: auto;
  padding: 7px 12px;
  border-radius: 15px;
  background: #20948b;
  color: white;
`;

const Author = styled.label`
  text-transform: capitalize;
  margin-left: 12px;
  margin: 0px 12px 3px 12px;
  margin-bottom: 3px;
  font-size: 12px;
`;

const Timestamp = styled.label`
  margin: 0 0.75em;
  font-size: 0.6em;
  color: rgba(0, 0, 0, 0.54);
`;

const ChatElement = ({
  id,
  ownerId,
  author,
  timestamp,
  message,
  avatar,
  color,
  isMine
}) => {
  console.log(`ChatElement`, isMine);
  return (
    <Container isMine={isMine} id={id} owner={ownerId} timestamp={timestamp}>
      <Display isMine={isMine}>
        <AvatarContainer>
          {avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <FontAwesomeIcon color="white" icon="user" />
          )}
        </AvatarContainer>
        <ColorIndicator style={{ background: color }}></ColorIndicator>
      </Display>
      <Info isMine={isMine}>
        <Author>{isMine ? `You` : author}</Author>
        <Message>{message}</Message>
        <Timestamp>
          <Moment fromNow>{timestamp}</Moment>
        </Timestamp>
      </Info>
    </Container>
  );
};

export default ChatElement;
