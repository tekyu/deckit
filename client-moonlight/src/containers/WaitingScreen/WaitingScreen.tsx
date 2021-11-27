import Button from 'components/Button/Button';
import Panel from 'components/Panel/Panel';
import PlayerBubble from 'components/PlayerBubble/PlayerBubble';
import PlayerCounter from 'components/PlayerCounter/PlayerCounter';
import RoomMode from 'components/RoomMode/RoomMode';
import { useDispatch, useSelector } from 'react-redux';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import * as Styled from './WaitingScreen.styled';

const WaitingScreen = (): JSX.Element => {
  const {
    name,
    id: roomId,
    mode,
    playersMax,
    players,
    owner,
  } = useSelector(roomSelectors.room);
  const userId = useSelector(userSelectors.id);
  const dispatch = useDispatch();
  const kickHandler = (playerId: string) => {
    dispatch(socketActions.emit(socketTopics.player.kick,
      { playerId, roomId },
      ({ error }: { error?: string }) => {
        if (error) {
          toast.error(error, {
            position: 'top-right',
            toastId: `nopermission-${roomId}-${playerId}`,

          });
        }
      }));
  };

  return (
    <Styled.WaitingScreen>
      <Panel>
        <Styled.Header>
          <RoomMode mode={mode} />
          <Styled.Name>
            {name}
            <Styled.Label>Waiting room</Styled.Label>
          </Styled.Name>
          <PlayerCounter max={playersMax} current={players.length} />
        </Styled.Header>
        <Styled.RoomIdDisplay>
          <Styled.IdDescription>
            This is the ID you can share to your friends to connect
          </Styled.IdDescription>
          <CopyToClipboard text={roomId}>
            <Button>{roomId}</Button>
          </CopyToClipboard>
        </Styled.RoomIdDisplay>
        <Styled.PlayerList>
          {players.map(({
            color, username, id, anonymous, state,
          }) => (
            <PlayerBubble
              key={`PlayerBubble-${id}`}
              color={color}
              username={username}
              id={id}
              anonymous={anonymous}
              ready={!!state}
              you={id === userId}
              isOwner={id === owner}
              {...(owner === userId && { adminPower: true, kickHandler })}
            />
          ))}
        </Styled.PlayerList>
      </Panel>
    </Styled.WaitingScreen>
  );
};
export default WaitingScreen;
