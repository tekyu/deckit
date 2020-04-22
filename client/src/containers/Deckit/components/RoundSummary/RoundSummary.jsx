import React from "react";
import styled from "styled-components";
import "swiper/swiper.scss";
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

const StyledHintMessage = styled.div`
  padding: 7px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28);
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const RoundSummary = ({ cards = [], hintCard = {} }) => {
  return (
    <StyledContainer>
      <StyledHand>
        {cards.map(({ card, owner, pickedBy = [] }) => {
          if (pickedBy.length > 0 || card.id === hintCard.id) {
            return (
              <StyledCardContainer key={card.id}>
                {card.id === hintCard.id && (
                  <StyledHintMessage>Hint card</StyledHintMessage>
                )}
                <Card
                  card={card}
                  owner={owner}
                  pickedBy={pickedBy}
                  key={owner.id}
                ></Card>
              </StyledCardContainer>
            );
          }
        })}
      </StyledHand>
    </StyledContainer>
  );
};

export default RoundSummary;
