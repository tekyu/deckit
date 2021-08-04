import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import 'swiper/swiper.scss';
import { deckitSelectors, userSelectors } from 'store/selectors';
import Blocker from 'components/Generic/Blocker/Blocker';
import Card from '../Card/Card';
import * as Styled from './PickedCards.styled';

const getCardState = (cardId, hinter, pickedCard, userId) => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return null;
  }
  return 'chooser';
};

const PickedCards = ({ cards = [] }) => {
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

PickedCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default PickedCards;
