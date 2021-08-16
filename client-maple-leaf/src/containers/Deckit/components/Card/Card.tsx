import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'components/Generic';
import { deckitActions } from 'store/actions';
import { deckitSelectors, roomSelectors } from 'store/selectors';
import { ICard } from 'containers/Deckit/components/Card/interfaces';
import PickedBy from './components/PickedBy';
import * as Styled from './Card.styled';

const Card = ({
  card = {}, state = 'picker', pickedBy = [],
}: ICard): JSX.Element => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const { id = 123, url = '' } = card;
  const activeRoomId = useSelector(roomSelectors.activeRoomId);
  const pickedCard = useSelector(deckitSelectors.pickedCard);
  const showButtonHandler = () => {
    setShowButton((lastState) => ((state === 'picker' && pickedCard)
      || (state === 'chooser' && pickedCard && pickedCard.id === id)
      ? false
      : !lastState));
  };
  const pickCardHandler = () => {
    switch (state) {
      case 'hinter':
        dispatch(deckitActions.sendHintCard({ activeRoomId, card }));
        break;
      case 'picker':
        dispatch(deckitActions.pickMyCard({ activeRoomId, card }));
        break;
      case 'chooser':
        dispatch(deckitActions.chooseHinterCard({ activeRoomId, card }));
        break;
      case 'summary':
        break;
      default:
        break;
    }
  };

  return (
    <Styled.Container
      clicked={showButton}
      id={`${id}`}
      key={id}
      url={url}
      onClick={showButtonHandler}
    >
      {state && showButton && (
        <Button type="button" onClick={pickCardHandler}>
          Pick card
        </Button>
      )}
      {pickedBy && pickedBy.length > 0 && <PickedBy pickedBy={pickedBy} />}
    </Styled.Container>
  );
};

export default Card;
