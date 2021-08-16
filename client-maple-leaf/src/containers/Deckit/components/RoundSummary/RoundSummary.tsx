import { cardType, pickedByType } from 'containers/Deckit/components/Card/interfaces';
import React from 'react';
import 'swiper/swiper.scss';
import Card from '../Card/Card';
import * as Styled from './RoundSummary.styled';

type ownerType = {
  id: string;
}
type pickedCardType = {
  id: string;
  owner: ownerType;
  pickedBy?: pickedByType[]
  card: cardType
}

type hintCardType = {
  id: string;
}

interface IRoundSummary {
  cards: pickedCardType[];
  hintCard: hintCardType
}
const RoundSummary = ({ cards = [], hintCard }: IRoundSummary): JSX.Element => (
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
                state=""
                card={card}
                // owner={owner}
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
