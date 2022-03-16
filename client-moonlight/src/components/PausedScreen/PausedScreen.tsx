import Button from 'components/Button/Button';
import { IPausedScreen } from 'components/PausedScreen/IPausedScreen';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import * as Styled from './PausedScreen.styled';

const PausedScreen = ({
  isOwner = false,
}: IPausedScreen): JSX.Element => {
  const { t } = useTranslation();
  const [kickError, setKickError] = useState<string>('');
  const players = useSelector(roomSelectors.players);
  const disconnectedPlayers = players.filter(({ state }) => state === 3);
  const dispatch = useDispatch();
  const roomId = useSelector(roomSelectors.id);
  const history = useHistory();

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

  const leaveRoomHandler = useCallback(() => {
    history.push('/');
  }, []);

  const buttonText = useMemo(() => {
    if (disconnectedPlayers.length > 0) {
      return disconnectedPlayers.length > 1 ? t('pauseScreen.kickPlayers') : t('pauseScreen.kickPlayer');
    }
    return t('pauseScreen.resume');
  }, [disconnectedPlayers]);

  return (
    <Styled.Backdrop>

      <Styled.PausedScreen>
        <Styled.Header>
          {t('pauseScreen.header')}
        </Styled.Header>
        {isOwner
          && (
            <>
              {disconnectedPlayers.length > 0
                && (
                  <>
                    <Styled.DisconnectedPlayersHeader>
                      {disconnectedPlayers.length > 1 ? t('pauseScreen.disconnectedPlayers') : t('pauseScreen.disconnectedPlayers')}
                    </Styled.DisconnectedPlayersHeader>
                    <Styled.DisconnectedPlayers>
                      {(disconnectedPlayers).map((player) => (
                        <Styled.DisconnectedPlayer>{player.username}</Styled.DisconnectedPlayer>
                      ))}
                    </Styled.DisconnectedPlayers>
                    {kickError && (
                      <Styled.Message>
                        {kickError}
                      </Styled.Message>
                    )}
                  </>
                )}
            </>
          )}

        <Styled.Controls>
          {isOwner
            ? (
              <Button
                type="button"
                palette="primary"
                variant="light"
                version="contained"
                onClick={kickPlayersHandler}
              >
                {buttonText}
              </Button>
            ) : ((
              <Button
                type="button"
                palette="primary"
                variant="light"
                version="contained"
                onClick={leaveRoomHandler}
              >
                {t('pauseScreen.leave')}
              </Button>
            ))}

          {disconnectedPlayers.length > 0 ? (
            <Styled.Message>
              {disconnectedPlayers.length > 1 ? t('pauseScreen.unpauseMultiple') : t('pauseScreen.unpauseOne')}
            </Styled.Message>
          ) : null}
        </Styled.Controls>

      </Styled.PausedScreen>
    </Styled.Backdrop>
  );
};

export default PausedScreen;
