import React from 'react';
import { useSelector } from 'react-redux';
import { roomSelectors, deckitSelectors } from 'store/selectors';
import ScoreElement from 'containers/GameContainer/SidePanel/panels/score/components/ScoreElement';
import * as Styled from './Winners.styled';

const Winners = () => {
  const players = useSelector(roomSelectors.players);
  const scoreboard = useSelector(roomSelectors.scoreboard);
  const maxScore = useSelector(deckitSelectors.maxScore);
  // eslint-disable-next-line max-len
  const sortedPlayers = [...players].sort((first, second) => scoreboard[second.id] - scoreboard[first.id]);
  const winner = sortedPlayers.shift();

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Announcement>And the winner is</Styled.Announcement>
        <Styled.Laurel />
        <Styled.Name>{winner && winner.username}</Styled.Name>
        <Styled.Announcement>Congratulations!</Styled.Announcement>
      </Styled.Header>
      <Styled.RunnersupHeader>Runners up</Styled.RunnersupHeader>
      <Styled.Runnersup>
        {sortedPlayers
          && sortedPlayers.map((player) => (
            <Styled.ScoreElement key={player.id}>
              <ScoreElement
                player={player}
                score={scoreboard[player.id]}
                progress={(scoreboard[player.id] / maxScore) * 100}
              />
            </Styled.ScoreElement>
          ))}
      </Styled.Runnersup>
      <Styled.ReturnLink to="/">
        <Styled.ReturnButton
          variant="contained"
          color="primary"
          aria-label="return to main menu"
        >
          Return to main menu
        </Styled.ReturnButton>
      </Styled.ReturnLink>
    </Styled.Container>
  );
};

export default Winners;
