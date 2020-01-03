import React, { memo } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  display: flex;
  margin: 0.5em;
  ${({ isMine }) =>
    isMine &&
    `
    justify-content: flex-end;
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
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6em;
  width: 1.6em;
  margin-top: 0.4em;
  padding: 0.5em;
  overflow: hidden;
`;

const ColorIndicator = styled.span`
  border-radius: 100%;
  display: block;
  position: absolute;
  bottom: 0px;
  right: 0.75em;
  height: 10px;
  width: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? `flex-end` : `flex-start`)};
`;

const Message = styled.p`
  background-color: ${({ isMine }) => (isMine ? `royalBlue` : `#20948b`)};
  border-radius: 0.9em;
  color: white;
  margin: 0.35em 0 0.2em 0;
  padding: 0.4em 0.75em;
  ${({ isSystem }) =>
    isSystem && `background: none; color: darkGrey; font-size: 0.75em`}
`;

const Author = styled.div`
  text-transform: capitalize;
  margin: 0 0.75em;
  font-size: 0.75em;
`;

const Timestamp = styled.div`
  margin: 0 1em;
  font-size: 0.6em;
  color: rgba(0, 0, 0, 0.6);
`;

const ChatElement = ({ author, timestamp, message, avatar, color, isMine }) => {
  return (
    <Container isMine={isMine} timestamp={timestamp}>
      {author ? (
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
      ) : null}
      <Info isMine={isMine}>
        <Author>{isMine ? `You` : author}</Author>
        <Message isSystem={!author} isMine={isMine}>
          {message}
        </Message>
        {author && (
          <Timestamp>
            <Moment fromNow>{timestamp}</Moment>
          </Timestamp>
        )}
      </Info>
    </Container>
  );
};

export default memo(ChatElement);
