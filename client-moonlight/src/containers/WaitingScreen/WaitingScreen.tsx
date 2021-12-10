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
import { BiArrowBack } from 'react-icons/bi';
import AddSeat from 'components/AddSeat/AddSeat';
import ReadyButton from 'components/ReadyButton/ReadyButton';
import StartGameButton from 'components/StartGameButton/StartGameButton';
import * as Styled from './WaitingScreen.styled';

const WaitingScreen = (): JSX.Element => {
  const {
    name,
    id: roomId,
    mode,
    playersMax,
    players,
    owner,
    admin,
  } = useSelector(roomSelectors.room);
  const userId = useSelector(userSelectors.id);
  const userState = useSelector(userSelectors.state);
  const dispatch = useDispatch();

  const adminPower = owner === userId || admin === userId;

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
          <Styled.GoBack to="/"><BiArrowBack /></Styled.GoBack>
        </Styled.Header>
        {adminPower ? (
          <Styled.RoomIdDisplay>
            <Styled.IdDescription>
              This is the ID you can share to your friends to connect
            </Styled.IdDescription>
            <CopyToClipboard text={roomId}>
              <Button>{roomId}</Button>
            </CopyToClipboard>
          </Styled.RoomIdDisplay>
        )
          : null}
        <PlayerCounter max={playersMax} current={players.length} />
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
              {...(adminPower && { adminPower: true, kickHandler })}
            />
          ))}
          {adminPower ? <AddSeat /> : null}

        </Styled.PlayerList>

        <Styled.Footer>
          {userId === owner
            ? (
              <StartGameButton
                arePlayersReady={
                  !players.some(({ state }) => state !== 1) && players.length >= 2
                }
                numberOfPlayers={players.length}
              />
            )
            : <ReadyButton id={userId} isReady={!!userState} state={userState} />}

        </Styled.Footer>
      </Panel>
    </Styled.WaitingScreen>
  );
};
export default WaitingScreen;
