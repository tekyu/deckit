import Button from 'components/Button/Button';
import PlayerBubble from 'components/PlayerBubble/PlayerBubble';
import { useDispatch, useSelector } from 'react-redux';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';
import StartGameButton from 'components/StartGameButton/StartGameButton';
import { useMemo } from 'react';
import TextInput from 'components/TextInput/TextInput';
import RoomSettings from 'components/RoomSettings/RoomSettings';
import * as Styled from './WaitingScreen.styled';

const WaitingScreen = (): JSX.Element => {
  const {
    id: roomId,
    players,
    owner,
    admin,
  } = useSelector(roomSelectors.room);
  const userId = useSelector(userSelectors.id);
  const me = useMemo(() => players.find(({ id }) => id === userId), [players]);

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
      <Styled.Header>
        <Styled.Info>

          <Styled.GoBack to="/"><BiArrowBack /></Styled.GoBack>
          <Styled.Name>
            Waiting room
          </Styled.Name>
          <Styled.Label>
            hosted by
            {' '}
            {players?.find(({ id }) => id === owner)?.username}
          </Styled.Label>
        </Styled.Info>
        {userId === owner
          && (
            <StartGameButton
              arePlayersReady={
                !players.some(({ state }) => state !== 1) && players.length >= 2
              }
              numberOfPlayers={players.length}
            />
          )}

      </Styled.Header>
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
            state={me?.state || 0}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(adminPower && { adminPower: true, kickHandler })}
          />
        ))}
        {Array.from(Array(10 - players.length), (_, i) => (
          <PlayerBubble
            key={`PlayerBubble-${i + 1 + players.length}`}
            empty
            number={i + 1 + players.length}
          />
        ))}

      </Styled.PlayerList>
      <Styled.Settings>
        <Styled.Label>Settings</Styled.Label>
        <RoomSettings />
      </Styled.Settings>
      <Styled.RoomIdDisplay>
        <Styled.Label>Invite friends</Styled.Label>
        <Styled.IdDescription>
          Share id of
          {' '}
          {roomId}
          {' '}
          or invite friends through link
        </Styled.IdDescription>
        <Styled.InputContainer>
          <TextInput formik={false} showBorder name="copy-game" value={`${window.location.origin}/game/${roomId}`} />
          <CopyToClipboard text={`${window.location.origin}/game/${roomId}`}>
            <Button>Copy</Button>
          </CopyToClipboard>
        </Styled.InputContainer>
      </Styled.RoomIdDisplay>
    </Styled.WaitingScreen>
  );
};
export default WaitingScreen;
