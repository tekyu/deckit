import React from 'react';
import { useSelector } from 'react-redux';
import 'swiper/swiper.scss';
import { deckitSelectors, userSelectors } from 'store/selectors';
import Blocker from 'components/Generic/Blocker/Blocker';
import { cardStateType } from 'containers/Deckit/components/Card/interfaces';
import Card from '../Card/Card';
import * as Styled from './PickedCards.styled';

type hinterType = {
  id: string;
}

type pickedCardType = {
  id: string;
}

const getCardState = (
  cardId: string,
  hinter: hinterType,
  pickedCard: pickedCardType,
  userId: string,
): cardStateType => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return '';
  }
  return 'chooser';
};

type cardType = {
  id: string;
  [x: string]: any;
}
interface IPickedCards {
  cards: cardType[];
}
const PickedCards = ({ cards = [] }: IPickedCards): JSX.Element => {
  const hinter = useSelector(deckitSelectors.hinter);
  const pickedCard = useSelector(deckitSelectors.pickedCard);
  const userId = useSelector(userSelectors.userId);
  const blockPickingArea = useSelector(deckitSelectors.blockPickingArea);

  return (
    <Styled.Container>
      {blockPickingArea && <Blocker />}
      <Styled.Hand>
        {cards.map(({ card }) => (
          <Styled.CardContainer key={card.id}>
            <Card
              card={card}
              key={card.id}
              state={getCardState(card.id, hinter, pickedCard, userId)}
            />
          </Styled.CardContainer>
        ))}
      </Styled.Hand>
    </Styled.Container>
  );
};

export default PickedCards;
