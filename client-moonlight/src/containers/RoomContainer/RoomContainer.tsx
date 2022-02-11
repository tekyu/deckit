import GameContainer from 'containers/GameContainer/GameContainer';
import WaitingScreen from 'containers/WaitingScreen/WaitingScreen';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { AnyAction } from 'redux';
import {
  gameActions, ICard, IGameState, IInitializeGame,
} from 'store/game/gameSlice';
import { IRoomState } from 'store/room/roomInterfaces';
import {
  roomActions, roomSelectors,
} from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { useAppThunkDispatch } from 'store/store';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './RoomContainer.styled';

interface IRoomRouteParams {
  id: string;
}

const RoomContainer = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    params: { id: roomId },
  } = useRouteMatch<IRoomRouteParams>();
  const dispatch = useDispatch();
  const appThunkDispatch = useAppThunkDispatch();
  const {
    id, initialized,
  } = useSelector(userSelectors.user);
  const roomIdFromStore = useSelector(roomSelectors.id);
  const activeRoomId = useSelector(roomSelectors.activeRoomId);
  const updateRoomHandler = (props: Partial<IRoomState>) => {
    dispatch(roomActions.updateRoom(props));
  };

  const kickedHandler = ({ roomId }: { roomId: string }) => {
    history.replace({ pathname: '/' });
    appThunkDispatch(roomActions.kickPlayer({ roomId }));
    toast.error(`You've been kicked from room ${roomId}`, {
      position: 'top-right',
      toastId: `kickedFrom-${roomId}`,
    });
  };

  const startGameHandler = (payload: IInitializeGame) => {
    dispatch(gameActions.initializeGame(payload));
  };

  const updateGameHandler = (payload: Partial<IGameState>) => {
    dispatch(gameActions.updateGame(payload));
  };

  const updateMyCardsHandler = (myCards: ICard[]) => {
    dispatch(gameActions.updateMyCards({ myCards }));
  };

  useEffect(() => {
    dispatch(socketActions.listener(socketTopics.room.updateRoom, updateRoomHandler));
    dispatch(socketActions.listener(socketTopics.player.kicked, kickedHandler));
    dispatch(socketActions.listener(socketTopics.game.started, startGameHandler));
    dispatch(socketActions.listener(socketTopics.game.update, updateGameHandler));
    dispatch(socketActions.listener(socketTopics.game.updateMyCards, updateMyCardsHandler));

    return () => {
      dispatch(socketActions.removeListener(socketTopics.room.updateRoom, updateRoomHandler));
      dispatch(socketActions.removeListener(socketTopics.player.kicked, kickedHandler));
      if (activeRoomId) {
        dispatch(socketActions.emit(socketTopics.room.leave));
      }
      dispatch(socketActions.removeListener(socketTopics.game.started, startGameHandler));
      dispatch(socketActions.removeListener(socketTopics.game.update, updateGameHandler));
      dispatch(socketActions.removeListener(socketTopics.game.updateMyCards, updateMyCardsHandler));
    };
  }, []);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      dispatch(socketActions.emit('PING_ROOM'));
    }, 270000); // 4.5 minutes
    return () => {
      clearInterval(pingInterval);
    };
  }, [dispatch]);

  useEffect(() => {
    if (id && initialized && !roomIdFromStore) {
      appThunkDispatch(roomActions.joinRoom({ roomId }))
        .then(({ type, error }: AnyAction) => {
          if (type.includes('rejected') && error) {
            history.replace('/');
            toast.error(t(`errors.room.connect.${error.message}`), {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    }
  }, [id, initialized, roomIdFromStore]);

  const roomState = useSelector(roomSelectors.state);

  const hasValidId = roomId === roomIdFromStore;
  const hasStarted = roomState > 1;

  return (
    <Styled.RoomContainer>
      {roomIdFromStore && (
        <>
          {hasValidId && hasStarted
            ? <GameContainer />
            : <WaitingScreen />}
        </>
      )}
    </Styled.RoomContainer>
  );
};

export default RoomContainer;
