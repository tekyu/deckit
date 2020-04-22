import React from "react";
import styled from "styled-components";
import "swiper/swiper.scss";
import Swiper from "react-id-swiper";
import Card from "../Card/Card";

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: auto;
  position: relative;
`;

const StyledHand = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

const StyledCardContainer = styled.div`
  transition: all 0.3s ease-in-out;
  /* &:not(:first-of-type) {
    margin-left: -160px;
  } */
  /* &:hover {
    padding-left: 16px;
    padding-right: 16px;
    &:not(:first-of-type) {
      margin-left: 0;
    }
  } */
  /* &:hover + div {
    &:not(:first-of-type) {
      margin-left: 0;
    }
  } */
`;

const getCardState = (cardId, hinter, pickedCard, userId) => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return null;
  }
  return "chooser";
};

const RoundSummary = ({ cards = [], hintCard = {} }) => {
  return (
    <StyledContainer>
      <StyledHand>
        {cards.map(({ card, owner, pickedBy = [] }) => {
          if (pickedBy.length > 0 || card.id === hintCard.id) {
            return (
              <StyledCardContainer key={card.id}>
                {card.id === hintCard.id && <p>Hint card</p>}
                <Card
                  card={card}
                  owner={owner}
                  pickedBy={pickedBy}
                  key={owner.id}
                >
                  {card.id === hintCard.id && <p>Hint card</p>}
                </Card>
              </StyledCardContainer>
            );
          }
        })}
      </StyledHand>
    </StyledContainer>
  );
};

export default RoundSummary;
