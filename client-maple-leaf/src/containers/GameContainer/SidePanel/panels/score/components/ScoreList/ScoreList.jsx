import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { deckitSelectors, roomSelectors } from 'store/selectors';
import ScoreElement from '../ScoreElement';

const StyledContainer = styled.div`
  flex: 1 1 1px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ScoreList = () => {
  const maxScore = useSelector(deckitSelectors.maxScore);
  const playersPickedCard = useSelector(deckitSelectors.playersPickedCard);
  const playersChoosedCard = useSelector(deckitSelectors.playersChoosedCard);
  const gameStage = useSelector(deckitSelectors.gameStage);
  const players = useSelector(roomSelectors.players);
  const scoreboard = useSelector(roomSelectors.scoreboard);

  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    const isPicked = (id) => {
      switch (gameStage) {
        case 3:
          return playersPickedCard.indexOf(id) !== -1;
        case 4:
          return playersChoosedCard.indexOf(id) !== -1;
        default:
          return false;
      }
    };

    setPlayersList(() => {
      // eslint-disable-next-line max-len
      const sortedPlayers = [...players].sort((first, second) => scoreboard[second.id] - scoreboard[first.id]);

      return sortedPlayers.map((player) => (
        <Flipped key={player.id} flipId={player.id}>
          <ScoreElement
            key={player.id}
            player={player}
            score={scoreboard[player.id]}
            progress={(scoreboard[player.id] / maxScore) * 100}
            didPick={isPicked(player.id)}
          />
        </Flipped>
      ));
    });
  }, [
    maxScore,
    players,
    playersPickedCard,
    scoreboard,
    gameStage,
    playersChoosedCard,
  ]);
  return (
    <StyledContainer>
      <Flipper spring="stiff" flipKey={JSON.stringify(scoreboard)}>
        {playersList}
      </Flipper>
    </StyledContainer>
  );
};

export default ScoreList;
