import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { roomSelectors, deckitSelectors } from "store/selectors";
import styled from "styled-components";
import CardsIcon from "../../../../../../../components/Generic/Icons/CardsIcon";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCardsPicked = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
    &:last-of-type {
      margin-left: 6px;
    }
  }
`;

const StyledRemainingCards = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin-right: 6px;
  }
`;

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
    <StyledContainer>
      <StyledCardsPicked>
        <span>Cards picked</span>
        <span>{`${picked} / ${players.length}`}</span>
      </StyledCardsPicked>
      <StyledRemainingCards>
        <span>{remainingCards}</span> <CardsIcon />
      </StyledRemainingCards>
    </StyledContainer>
  );
};

export default PlayersInfo;
