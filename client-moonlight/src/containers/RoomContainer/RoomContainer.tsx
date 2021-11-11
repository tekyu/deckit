import GameContainer from 'containers/GameContainer/GameContainer';
import IRoomContainer from 'containers/RoomContainer/IRoomContainer';
import WaitingScreen from 'containers/WaitingScreen/WaitingScreen';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './RoomContainer.styled';

interface IRoomRouteParams {
  id: string;
}
const RoomContainer = ({
  children = 'Default',
}: IRoomContainer): JSX.Element => {
  const {
    params: { id: roomId },
  } = useRouteMatch<IRoomRouteParams>();
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.user);
  const roomIdFromStore = useSelector(roomSelectors.id);

  const onRoomJoin = (roomData: any) => {
    console.log('onRoomJoin', roomData);
  };

  useEffect(() => {
    if (user.id && user.initialized && !roomIdFromStore) {
      dispatch(socketActions.emit(
        socketTopics.room.joinRoom,
        { roomId, userData: user },
        onRoomJoin,
      ));
    }
  }, []);

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
