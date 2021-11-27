import GameContainer from 'containers/GameContainer/GameContainer';
import WaitingScreen from 'containers/WaitingScreen/WaitingScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { IRoomState } from 'store/room/roomInterfaces';
import {
  roomActions, roomSelectors,
} from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './RoomContainer.styled';

interface IRoomRouteParams {
  id: string;
}

const RoomContainer = (): JSX.Element => {
  const history = useHistory();
  const {
    params: { id: roomId },
  } = useRouteMatch<IRoomRouteParams>();
  const dispatch = useDispatch();
  const {
    id, username, anonymous, initialized,
  } = useSelector(userSelectors.user);
  const roomIdFromStore = useSelector(roomSelectors.id);

  const updateRoomHandler = (props: Partial<IRoomState>) => {
    dispatch(roomActions.updateRoom(props));
  };

  const kickedHandler = ({ roomId }: { roomId: string }) => {
    history.replace({ pathname: '/' });
    dispatch(roomActions.kickPlayer());
    toast.error(`You've been kicked from room ${roomId}`, {
      position: 'top-right',
      toastId: `kickedFrom-${roomId}`,
    });
  };

  useEffect(() => {
    dispatch(socketActions.listener(socketTopics.room.updateRoom, updateRoomHandler));
    dispatch(socketActions.listener(socketTopics.player.kicked, kickedHandler));

    return () => {
      dispatch(socketActions.removeListener(socketTopics.room.updateRoom, updateRoomHandler));
      dispatch(socketActions.removeListener(socketTopics.player.kicked, kickedHandler));
    };
  }, []);

  useEffect(() => {
    if (id && initialized && !roomIdFromStore) {
      dispatch(roomActions.joinRoom({ roomId, userData: { id, username, anonymous } }));
    }
  }, [id, initialized, roomIdFromStore]);

  const roomState = useSelector(roomSelectors.state);

  const hasValidId = roomId === roomIdFromStore;
  const hasStarted = roomState > 1;

  return (
    <Styled.RoomContainer>
      {hasValidId && hasStarted ? <GameContainer /> : <WaitingScreen />}
    </Styled.RoomContainer>
  );
};

export default RoomContainer;
