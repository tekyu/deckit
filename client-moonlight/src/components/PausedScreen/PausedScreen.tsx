import Button from 'components/Button/Button';
import { IPausedScreen } from 'components/PausedScreen/IPausedScreen';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import * as Styled from './PausedScreen.styled';

const PausedScreen = ({
  isOwner = false,
}: IPausedScreen): JSX.Element => {
  const [kickError, setKickError] = useState<string>('');
  const players = useSelector(roomSelectors.players);
  const disconnectedPlayers = players.filter(({ state }) => state === 3);
  const dispatch = useDispatch();
  const roomId = useSelector(roomSelectors.id);
  const kickPlayersHandler = useCallback(() => {
    dispatch(socketActions.emit(
      socketTopics.game.kickDisconnectedPlayers,
      { roomId },
      (error: string) => {
        if (error) {
          setKickError(error);
        }
      },
    ));
  }, []);

  return (
    <Styled.Backdrop>

      <Styled.PausedScreen>
        <Styled.Header>
          Game paused
        </Styled.Header>
        {isOwner
          && (
            <>
              {disconnectedPlayers.length > 0
                && (
                  <>
                    <Styled.DisconnectedPlayersHeader>
                      {`Disconnected player${disconnectedPlayers.length > 1 ? 's' : ''}`}
                    </Styled.DisconnectedPlayersHeader>
                    <Styled.DisconnectedPlayers>
                      {(disconnectedPlayers).map((player) => (
                        <Styled.DisconnectedPlayer>{player.username}</Styled.DisconnectedPlayer>
                      ))}
                    </Styled.DisconnectedPlayers>
                  </>
                )}
              <Styled.Controls>
                <Button
                  type="button"
                  palette="primary"
                  variant="light"
                  version="contained"
                  onClick={kickPlayersHandler}
                >
                  {
                    disconnectedPlayers.length > 0
                      ? `Kick player${disconnectedPlayers.length > 1 ? 's' : ''} and resume`
                      : 'Resume'
                  }
                </Button>
                {kickError && (
                  <Styled.Message>
                    {kickError}
                  </Styled.Message>
                )}
                {disconnectedPlayers.length > 0 ? (
                  <Styled.Message>
                    {`Room will unpause itself when ${disconnectedPlayers.length > 1 ? 'all of the players' : 'player'} reconnects`}
                  </Styled.Message>
                ) : null}
              </Styled.Controls>
            </>
          )}
      </Styled.PausedScreen>
    </Styled.Backdrop>
  );
};

export default PausedScreen;
