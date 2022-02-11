import { orderBy } from 'lodash';
import { useCallback, useMemo } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSelector } from 'react-redux';
import { gameSelectors } from 'store/game/gameSlice';
import { roomSelectors } from 'store/room/roomSlice';
import ScoreboardHeader from 'components/ScoreboardHeader/ScoreboardHeader';
import ScoreboardItem from 'components/ScoreboardItem/ScoreboardItem';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './Scoreboard.styled';

const Scoreboard = (): JSX.Element => {
  const scoreboard = useSelector(roomSelectors.scoreboard);
  const players = useSelector(roomSelectors.players);
  const round = useSelector(gameSelectors.round);
  const maxScore = useSelector(gameSelectors.maxScore);
  const owner = useSelector(roomSelectors.owner);
  const userId = useSelector(userSelectors.id);
  const hinter = useSelector(gameSelectors.hinter);
  const stage = useSelector(gameSelectors.stage);
  const playersPickedCardFromDeck = useSelector(gameSelectors.playersPickedCardFromDeck);
  const playersPickedCardFromBoard = useSelector(gameSelectors.playersPickedCardFromBoard);
  const remainingCards = useSelector(gameSelectors.remainingCards);
  const sortedPlayers = useMemo(() => orderBy(players, [({ id }) => scoreboard[id]], ['desc']), [players, scoreboard]);

  const hasPicked = (playerId: string): boolean => {
    console.log('hasPicked', playerId, playersPickedCardFromDeck, playersPickedCardFromBoard);
    if (stage === 3) {
      return playersPickedCardFromDeck.indexOf(playerId) !== -1;
    }
    if (stage === 4) {
      return playersPickedCardFromBoard.indexOf(playerId) !== -1;
    }
    return false;
  };

  return (
    <Styled.Scoreboard>
      <ScoreboardHeader round={round} maxScore={maxScore} remainingCards={remainingCards} />
      <Styled.List>
        <Flipper flipKey="scoreboard-list">
          {sortedPlayers.map(({ id, username }, index) => (
            <Flipped flipId={id}>
              <ScoreboardItem
                key={`scoreboard-item-${id}`}
                isHinter={hinter.id === id}
                owner={owner}
                id={id}
                username={username}
                position={index + 1}
                score={scoreboard[id]}
                picked={hasPicked(id)}
              />
            </Flipped>
          ))}
        </Flipper>
      </Styled.List>
    </Styled.Scoreboard>
  );
};

export default Scoreboard;
