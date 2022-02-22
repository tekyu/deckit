import Card from 'components/Card/Card';
import Message from 'components/Message/Message';
import {
  useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectors } from 'store/app/appSlice';
import { gameActions, gameSelectors } from 'store/game/gameSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import * as Styled from './Board.styled';
import 'keen-slider/keen-slider.min.css';

const mockStatuses = {
  hinter: {
    main: 'You are the storyteller now.',
    card: 'Choose your card',
    hint: 'Please type your clue for the card you have chosen',
    ready: 'Please wait for others',

  },
  chooser: {
    wait: 'Please wait for the clue',
    fromDeck: 'Choose the card from your deck that fits the best',
    fromBoard: 'Find the storyteller\'s card!',
    ready: 'Other players are voting, please wait',
  },
};

const Board = (): JSX.Element => {
  const dispatch = useDispatch();
  const hinter = useSelector(gameSelectors.hinter);
  const hint = useSelector(gameSelectors.hint);
  const userId = useSelector(userSelectors.id);
  const hintCardPickedByMe = useSelector(gameSelectors.hintCardPickedByMe);
  const hintPickedByMe = useSelector(gameSelectors.hintPickedByMe);
  const pickedCardFromMyDeck = useSelector(gameSelectors.pickedCardFromMyDeck);
  const pickedCardFromBoard = useSelector(gameSelectors.pickedCardFromBoard);
  const stage = useSelector(gameSelectors.stage);
  const cardsForBoard = useSelector(gameSelectors.cardsForBoard);
  const host = useSelector(appSelectors.host);
  const isHinter = useMemo(() => hinter.id === userId, [hinter, userId]);

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free-snap',
    breakpoints: {
      '(max-width: 600px)': {
        slides: {
          perView: 1,
          spacing: 10,
          origin: 'center',
        },
      },
      '(min-width: 600px) and (max-width: 900px)': {
        slides: {
          perView: 2,
          spacing: 10,
          origin: 'center',
        },
      },
      '(min-width: 900px) and (max-width: 1400px)': {
        slides: {
          perView: 3,
          spacing: 10,
          origin: 'center',
        },
      },
      '(min-width: 1400px) and (max-width: 1800px)': {
        slides: {
          perView: 4,
          spacing: 10,
          origin: 'center',
        },
      },
      '(min-width: 1800px)': {
        slides: {
          perView: 6,
          spacing: 10,
          origin: 'center',
        },
      },
    },
  });

  // const [images, setImages] = useState<any>([]);
  useEffect(() => {
    setTimeout(() => {
      // setImages(cardsForBoard);
      if (slider?.current?.update) slider.current.update();
    }, 1000);
  }, [cardsForBoard, slider]);

  const getMessage = useMemo(() => {
    if (isHinter) {
      // hinter
      if (hintPickedByMe && hintCardPickedByMe) {
        return mockStatuses.hinter.ready;
      }
      if (!hintCardPickedByMe) {
        return mockStatuses.hinter.card;
      }
      if (!hintPickedByMe) {
        return mockStatuses.hinter.hint;
      }
      return '';
    }
    // chooser
    if (stage === 2) {
      return mockStatuses.chooser.wait;
    }
    if (stage === 3) {
      return pickedCardFromMyDeck ? mockStatuses.chooser.ready : mockStatuses.chooser.fromDeck;
    }
    if (stage === 4) {
      return pickedCardFromBoard ? mockStatuses.chooser.ready : mockStatuses.chooser.fromBoard;
    }
    return '';
  }, [
    isHinter,
    hintPickedByMe,
    hintCardPickedByMe,
    stage,
    pickedCardFromMyDeck,
    pickedCardFromBoard,
  ]);

  const showButton = useMemo(() => {
    if (isHinter) {
      return false;
    }
    if (stage === 4 && !pickedCardFromBoard) {
      return true;
    }
    return false;
  }, [stage, pickedCardFromBoard]);

  const showButtonHandler = useCallback((id: string) => {
    dispatch(gameActions.setPickedCardFromBoard({ id }));
    dispatch(socketActions.emit(socketTopics.game.sendCardFromBoard, { cardId: id }));
  }, []);

  return (
    <Styled.Board>
      <Styled.MessagesContainer>
        {isHinter ? (
          <>
            <Message special>{mockStatuses.hinter.main}</Message>
            {hint && (
              <Message>
                Clue you entered is
                {' '}
                {hint}
              </Message>
            )}
          </>
        ) : null}
        {hint && !isHinter ? (
          <>
            <Message>
              Clue for this round is
            </Message>
            <Message special>
              {hint}
            </Message>
          </>
        ) : null}
        {getMessage ? <Message>{getMessage}</Message> : null}
      </Styled.MessagesContainer>

      {cardsForBoard?.length ? (
        <Styled.Cards ref={ref} className="keen-slider">
          {cardsForBoard.map((id: string, index) => (
            <div key={`board-card-${id}`} className={`keen-slider__slide number-slide${index + 1}`}>
              <Card
                id={`${id}`}
                title={`card-${id}`}
                url={`${host}/card/${id}.jpg`}
                showButton={showButton && pickedCardFromMyDeck !== id}
                showButtonHandler={showButtonHandler}
              />
            </div>
          ))}
        </Styled.Cards>
      ) : null}
    </Styled.Board>
  );
};

export default Board;
