import React from 'react';
import PlayerBubble from 'components/Generic/PlayerBubble/PlayerBubble';
import * as Styled from './ScoreElement.styled';

interface IPlayer {
  id: string;
  avatar: string;
  username: string;
  color: string;
}

interface IScoreElement {
  player: IPlayer;
  score: number;
  progress: number;
  didPick?: boolean
}

const ScoreElement = ({
  player: {
    id, avatar, username, color,
  },
  score = 0,
  progress = 0,
  didPick = false,
}: IScoreElement): JSX.Element => (
  <Styled.Container id={id} progress={progress} didNotPick={!didPick}>
    <Styled.InfoContainer>
      <PlayerBubble avatar={avatar} color={color} didPick={didPick} />
      <Styled.Info>
        <Styled.Username>{username}</Styled.Username>
        <Styled.Score>{score}</Styled.Score>
      </Styled.Info>
    </Styled.InfoContainer>
  </Styled.Container>
);

export default ScoreElement;
