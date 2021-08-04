import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { roomSelectors, deckitSelectors } from 'store/selectors';
import CardsIcon from 'components/Generic/Icons/CardsIcon';
import * as Styled from './PlayersInfo.styled';

const PlayersInfo = () => {
  const playersPickedCard = useSelector(deckitSelectors.playersPickedCard);
  const playersChoosedCard = useSelector(deckitSelectors.playersChoosedCard);
  const players = useSelector(roomSelectors.players);
  const gameStage = useSelector(deckitSelectors.gameStage);
  const remainingCards = useSelector(deckitSelectors.remainingCards);
  const [picked, setPicked] = useState(0);

  useEffect(() => {
    setPicked(() => {
      switch (gameStage) {
        case 3:
          return playersPickedCard.length;
        case 4:
          return playersChoosedCard.length;
        default:
          return 0;
      }
    });
  }, [playersPickedCard, playersChoosedCard, gameStage]);

  return (
    <Styled.Container>
      <Styled.CardsPicked>
        <span>Cards picked</span>
        <span>{`${picked} / ${players.length}`}</span>
      </Styled.CardsPicked>
      <Styled.RemainingCards>
        <span>{remainingCards}</span>
        {' '}
        <CardsIcon />
      </Styled.RemainingCards>
    </Styled.Container>
  );
};

export default PlayersInfo;
