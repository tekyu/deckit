import Card from 'components/Card/Card';
import { IDeck } from 'containers/Deck/IDeck';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions, gameSelectors } from 'store/game/gameSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './Deck.styled';

const Deck = ({
  children = 'Default',
}: IDeck): JSX.Element => {
  const dispatch = useDispatch();
  const myCards = useSelector(gameSelectors.myCards);
  const hinter = useSelector(gameSelectors.hinter);
  const stage = useSelector(gameSelectors.stage);
  const myId = useSelector(userSelectors.id);
  const hintCardPickedByMe = useSelector(gameSelectors.hintCardPickedByMe);
  const pickedCardFromMyDeck = useSelector(gameSelectors.pickedCardFromMyDeck);
  const pickedCardFromBoard = useSelector(gameSelectors.pickedCardFromBoard);
  const isHinter = useMemo(() => hinter.id === myId, [hinter, myId]);

  const showButton = useMemo(() => {
    if (isHinter && !hintCardPickedByMe) {
      return true;
    }
    if (!isHinter && stage === 3 && !pickedCardFromMyDeck) {
      return true;
    }
    return false;
  }, [hinter, myId, stage, hintCardPickedByMe, pickedCardFromMyDeck, pickedCardFromBoard]);

  const showButtonHandler = useCallback((id: string) => {
    if (isHinter) {
      dispatch(gameActions.setHintCardPickedByMe({ id }));
    } else if (stage === 3 && !pickedCardFromMyDeck) {
      dispatch(gameActions.setPickedCardFromMyDeck({ id }));
      dispatch(socketActions.emit(socketTopics.game.sendCardFromDeck, { cardId: id }));
    }
  }, [isHinter, stage]);

  return (
    <Styled.Deck enableDeck={showButton}>
      <Styled.Container showCards={showButton}>

        {myCards.map(({ id, title, url }) => (
          <Card key={`deck-card-${id}`} id={`${id}`} title={title} url={url} showButton={showButton} showButtonHandler={showButtonHandler} />
        ))}
      </Styled.Container>
    </Styled.Deck>
  );
};

export default React.memo(Deck);
