import React, { memo } from 'react';
import Moment from 'react-moment';
import PlayerBubble from 'components/Generic/PlayerBubble/PlayerBubble';
import * as Styled from './ChatElement.styled';

export interface IChatElement {
  id: string;
  ownerId: string;
  ownerName?: string;
  timestamp?: number;
  message?: string;
  avatar?: string;
  color?: string;
  isMine: boolean;
}

const ChatElement = ({
  id = '123',
  ownerId = '456',
  ownerName = 'Default name',
  timestamp = Date.now(),
  message = 'Default message',
  avatar = '',
  color = '#FF0000',
  isMine = true,
}: IChatElement): JSX.Element => (
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

export default memo(ChatElement);
