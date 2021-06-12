import React from "react";
import "swiper/swiper.scss";
import Card from "../Card/Card";
import * as Styled from './RoundSummary.styled';

const RoundSummary = ({ cards = [], hintCard = {} }) => (
  <Styled.Container>
    <Styled.Hand>
      {cards.map(({ card, owner, pickedBy = [] }) => {
        if (pickedBy.length > 0 || card.id === hintCard.id) {
          return (
            <Styled.CardContainer key={card.id}>
              {card.id === hintCard.id && (
                <Styled.HintMessage>Hint card</Styled.HintMessage>
              )}
              <Card
                card={card}
                owner={owner}
                pickedBy={pickedBy}
                key={owner.id}
              />
            </Styled.CardContainer>
          );
        }
        return null;
      })}
    </Styled.Hand>
  </Styled.Container>
);

export default RoundSummary;
