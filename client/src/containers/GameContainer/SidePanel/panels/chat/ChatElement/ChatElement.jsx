import React, { memo } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import PlayerBubble from "../../../../../../components/Generic/PlayerBubble/PlayerBubble";

const Container = styled.div`
  display: flex;
  margin: 7px 0;
  ${({ isMine }) =>
    isMine &&
    `
    text-align:right;
    justify-content: flex-end;
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
  width: 30px;
  height: 0;
  margin: 0 auto;
  padding-bottom: 30px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  img {
    // position:absolute;
  }
  span {
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? `flex-end` : `flex-start`)};
  width: 100%;
`;

const Message = styled.p`
  width: auto;
  height: auto;
  padding: 7px 12px;
  border-radius: 15px;
  background: #009bff;
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
  margin: 4px 12px 0 12px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.54);
`;

const ChatElement = ({
  id,
  ownerId,
  ownerName,
  timestamp,
  message,
  avatar,
  color,
  isMine
}) => {
  return (
    <Container isMine={isMine} id={id} owner={ownerId} timestamp={timestamp}>
      <Display isMine={isMine}>
        <AvatarContainer>
          <PlayerBubble avatar={avatar} color={color} />
          {/* <img src={avatar} alt={ownerName} /> */}
        </AvatarContainer>
      </Display>
      <Info isMine={isMine}>
        <Author>{isMine ? `You` : ownerName}</Author>
        <Message>{message}</Message>
        <Timestamp>
          <Moment fromNow>{timestamp}</Moment>
        </Timestamp>
      </Info>
    </Container>
  );
};

export default memo(ChatElement);
