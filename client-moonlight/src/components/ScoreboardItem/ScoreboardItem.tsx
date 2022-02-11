import { IScoreboardItem } from 'components/ScoreboardItem/IScoreboardItem';
import Tooltip from 'components/Tooltip/Tooltip';
import { GiCardPick, GiCardPlay } from 'react-icons/gi';
import * as Styled from './ScoreboardItem.styled';

const ScoreboardItem = ({
  isHinter,
  owner,
  id,
  username,
  position,
  score,
  picked = false,
}: IScoreboardItem): JSX.Element => {
  const getIcon = () => {
    if (isHinter) {
      return (
        <Styled.StateIcon picked={picked} data-tip data-for="scoreboard-hinter">
          <GiCardPick />
          <Tooltip id="scoreboard-hinter" tooltipProps={{ place: 'right' }}>
            Player is choosing hint and card
          </Tooltip>
        </Styled.StateIcon>
      );
    }
    if (picked) {
      return (
        <Styled.StateIcon picked={picked} data-tip data-for={`scoreboard-picker-${id}`}>
          <GiCardPlay />
          <Tooltip id={`scoreboard-picker-${id}`} tooltipProps={{ place: 'right' }}>
            Player is waiting for others
          </Tooltip>
        </Styled.StateIcon>
      );
    }
    return null;
  };
  return (
    <Styled.ScoreboardItem>
      {getIcon()}
      <Styled.Score
        isHinter={isHinter}
        position={position}
        picked={picked}
      >
        {score}

      </Styled.Score>
      <Styled.Info>
        <Styled.Name picked={picked} position={position}>{username}</Styled.Name>
      </Styled.Info>
      {owner === id ? <Styled.Owner>Owner</Styled.Owner> : null}

    </Styled.ScoreboardItem>
  );
};

export default ScoreboardItem;