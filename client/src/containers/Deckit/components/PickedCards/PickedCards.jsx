import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "swiper/swiper.scss";
import { deckitSelectors, userSelectors } from "store/selectors";
import Card from "../Card/Card";
import Blocker from "../../../../components/Generic/Blocker/Blocker";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  transition: height 0.4s ease-in-out;
  margin-top: auto;
  overflow: hidden;
`;

const StyledHand = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

const StyledCardContainer = styled.div`
  transition: all 0.3s ease-in-out;
  &:not(:first-of-type) {
    margin-left: -160px;
  }
  &:hover {
    padding-left: 16px;
    padding-right: 16px;
    &:not(:first-of-type) {
      margin-left: 0;
    }
  }
  &:hover + div {
    &:not(:first-of-type) {
      margin-left: 0;
    }
  }
`;

const getCardState = (cardId, hinter, pickedCard, userId) => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return null;
  }
  return "chooser";
};

const PickedCards = ({ cards = [] }) => {
  const hinter = useSelector(deckitSelectors.hinter);
  const pickedCard = useSelector(deckitSelectors.pickedCard);
  const userId = useSelector(userSelectors.userId);
  const blockPickingArea = useSelector(deckitSelectors.blockPickingArea);

  return (
    <StyledContainer>
      {blockPickingArea && <Blocker />}
      <StyledHand>
        {cards.map(({ card }) => {
          return (
            <StyledCardContainer key={card.id}>
              <Card
                card={card}
                key={card.id}
                state={getCardState(card.id, hinter, pickedCard, userId)}
              />
            </StyledCardContainer>
          );
        })}
      </StyledHand>
    </StyledContainer>
  );
};

export default PickedCards;
