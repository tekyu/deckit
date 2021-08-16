import React from 'react';
import { useSelector } from 'react-redux';
import { roomSelectors } from 'store/selectors';
import PlayerBubble from 'components/Generic/PlayerBubble/PlayerBubble';
import * as Styled from './HinterPlayer.styled';

const HinterPlayer = ({ hinterId }: { hinterId: string }): JSX.Element => {
  const { players = [] } = useSelector(roomSelectors.activeRoom);
  const { avatar, color, username } = players.find(({
    // @ts-ignore
    id,
  }) => hinterId === id) || {};

  return (
    <Styled.Container>
      <PlayerBubble avatar={avatar} color={color} />
      <Styled.Span>
        {username}
        {' '}
        is choosing a hint. Please wait
      </Styled.Span>
    </Styled.Container>
  );
};

export default HinterPlayer;
