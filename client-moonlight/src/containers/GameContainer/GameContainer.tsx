import HintInput from 'components/HintInput/HintInput';
import PausedScreen from 'components/PausedScreen/PausedScreen';
import Winners from 'components/Winners/Winners';
import Board from 'containers/Board/Board';
import Deck from 'containers/Deck/Deck';
import Scoreboard from 'containers/Scoreboard/Scoreboard';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions, gameSelectors } from 'store/game/gameSlice';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './GameContainer.styled';

const GameContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const hinter = useSelector(gameSelectors.hinter);
  const userId = useSelector(userSelectors.id);
  const roomState = useSelector(roomSelectors.state);
  const owner = useSelector(roomSelectors.owner);
  const hintCardPickedByMe = useSelector(gameSelectors.hintCardPickedByMe);
  const hintPickedByMe = useSelector(gameSelectors.hintPickedByMe);
  const gameStage = useSelector(gameSelectors.stage);
  const isHinter = useMemo(() => hinter.id === userId, [hinter, userId]);

  const sendHint = useCallback(({ hint, cardId }: { hint: string; cardId: string }) => {
    dispatch(socketActions.emit(socketTopics.game.sendHint, { hint, cardId }));
  }, []);

  const nextRoundHandler = () => {
    dispatch(gameActions.resetForNextRound());
  };

  useEffect(() => {
    dispatch(socketActions.listener(socketTopics.game.nextRound, nextRoundHandler));
    dispatch(socketActions.listener(socketTopics.game.resetRound, nextRoundHandler));

    return () => {
      dispatch(socketActions.removeListener(socketTopics.game.nextRound, nextRoundHandler));
      dispatch(socketActions.removeListener(socketTopics.game.resetRound, nextRoundHandler));
    };
  }, []);

  useEffect(() => {
    if (isHinter && hintPickedByMe && hintCardPickedByMe) {
      sendHint({
        hint: hintPickedByMe,
        cardId: hintCardPickedByMe,
      });
    }
  }, [isHinter, hintPickedByMe, hintCardPickedByMe]);

  const showHintInput = useMemo(
    () => (!!(isHinter && hintCardPickedByMe && !hintPickedByMe)),
    [isHinter, hintCardPickedByMe, hintPickedByMe],
  );

  return (
    <Styled.GameContainer showHintInput={showHintInput}>
      {roomState === 3 && <PausedScreen isOwner={userId === owner} />}
      {gameStage === 8 ? <Winners /> : null}
      {showHintInput && <HintInput />}
      <Styled.Main>
        <Board />
        <Scoreboard />
      </Styled.Main>
      <Deck />
    </Styled.GameContainer>
  );
};

export default GameContainer;
