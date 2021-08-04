import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import PlayerBubble from 'components/Generic/PlayerBubble/PlayerBubble';
import * as Styled from './ChatElement.styled';

const ChatElement = ({
  id,
  ownerId,
  ownerName,
  timestamp,
  message,
  avatar,
  color,
  isMine,
}) => (
  <Styled.Container isMine={isMine} id={id} owner={ownerId} timestamp={timestamp}>
    <Styled.Display isMine={isMine}>
      <Styled.AvatarContainer>
        <PlayerBubble avatar={avatar} color={color} />
      </Styled.AvatarContainer>
    </Styled.Display>
    <Styled.Info isMine={isMine}>
      <Styled.Author>{isMine ? 'You' : ownerName}</Styled.Author>
      <Styled.Message>{message}</Styled.Message>
      <Styled.Timestamp>
        <Moment fromNow>{timestamp}</Moment>
      </Styled.Timestamp>
    </Styled.Info>
  </Styled.Container>
);

ChatElement.defaultProps = {
  id: '123',
  ownerId: '456',
  ownerName: 'Default name',
  timestamp: Date.now(),
  message: 'Default message',
  avatar: '',
  color: '#FF0000',
  isMine: true,
};

ChatElement.propTypes = {
  id: PropTypes.string,
  ownerId: PropTypes.string,
  ownerName: PropTypes.string,
  timestamp: PropTypes.number,
  message: PropTypes.string,
  avatar: PropTypes.string,
  color: PropTypes.string,
  isMine: PropTypes.bool,
};

export default memo(ChatElement);
