import Button from 'components/Button/Button';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { roomSelectors } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './Winners.styled';

const Winners = (): JSX.Element => {
  const { t } = useTranslation();
  const playerId = useSelector(userSelectors.id);
  const scoreboard = useSelector(roomSelectors.scoreboard);
  const players = useSelector(roomSelectors.players);
  const playAgain = useSelector(roomSelectors.playAgain);
  const dispatch = useDispatch();
  const sortedPlayers = useMemo(() => [...players].sort(
    (first, second) => scoreboard[second.id] - scoreboard[first.id],
  ), [scoreboard, players]);

  const winner = sortedPlayers[0];

  const playAgainHandler = () => {
    dispatch(socketActions.emit(socketTopics.room.playAgain, { playerId }));
  };

  return (
    <Styled.Backdrop>
      <Styled.Winners>
        <Styled.Header>
          <Styled.Announcement>{t('endScreen.header')}</Styled.Announcement>
          <Styled.Crown />
          <Styled.Winner>{winner?.username}</Styled.Winner>
          <Styled.WinnerScore>{scoreboard[winner?.id || 't'] || 0}</Styled.WinnerScore>
          {t('endScreen.pointsPlural')}
        </Styled.Header>
        <Styled.Headers>
          <Styled.Place>{t('endScreen.position')}</Styled.Place>
          <Styled.Name />
          <Styled.Points>{t('endScreen.points')}</Styled.Points>
        </Styled.Headers>
        <Styled.List>
          {sortedPlayers.map(({ id, username }, index) => (index > 0 && (
            <Styled.Player>
              <Styled.Place>{index + 2}</Styled.Place>
              <Styled.Name>
                {username}
              </Styled.Name>
              <Styled.Points>{scoreboard[id]}</Styled.Points>
            </Styled.Player>
          )))}
        </Styled.List>
        <Styled.Controls>
          <Styled.PlayAgain>
            <Button
              type="button"
              palette={`${playAgain.indexOf(playerId) === -1 ? 'primary' : 'success'}`}
              variant={`${playAgain.indexOf(playerId) === -1 ? 'light' : 'main'}`}
              version="contained"
              onClick={playAgainHandler}
            >
              {t('endScreen.playAgainButton')}
              <Styled.PlayAgainCounter>{`${playAgain.length}/${players.length}`}</Styled.PlayAgainCounter>
            </Button>
          </Styled.PlayAgain>
          <Link to="/">
            <Button
              type="button"
              palette="primary"
              variant="light"
              version="text"
            >
              {t('endScreen.leaveButton')}
            </Button>
          </Link>
        </Styled.Controls>
      </Styled.Winners>
    </Styled.Backdrop>
  );
};

export default Winners;
