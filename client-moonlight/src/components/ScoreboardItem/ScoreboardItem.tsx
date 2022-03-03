import { IScoreboardItem } from 'components/ScoreboardItem/IScoreboardItem';
import Tooltip from 'components/Tooltip/Tooltip';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GiCardPick, GiCardPlay } from 'react-icons/gi';
import { RiWifiOffLine } from 'react-icons/ri';
import * as Styled from './ScoreboardItem.styled';

const ScoreboardItem = ({
  isHinter,
  owner,
  id,
  username,
  position,
  score,
  state,
  picked = false,
}: IScoreboardItem): JSX.Element => {
  const { t } = useTranslation();
  const disconnected = useMemo(() => state === 3, [state]);
  const getIcon = () => {
    if (isHinter) {
      return (
        <Styled.StateIcon picked={picked} data-tip data-for="scoreboard-hinter">
          <GiCardPick />
          <Tooltip id="scoreboard-hinter" tooltipProps={{ place: 'right' }}>
            {t('scoreboard.choosingHintTooltip')}
          </Tooltip>
        </Styled.StateIcon>
      );
    }
    if (picked) {
      return (
        <Styled.StateIcon picked={picked} data-tip data-for={`scoreboard-picker-${id}`}>
          <GiCardPlay />
          <Tooltip id={`scoreboard-picker-${id}`} tooltipProps={{ place: 'right' }}>
            {t('scoreboard.waitingTooltip')}
          </Tooltip>
        </Styled.StateIcon>
      );
    }
    return null;
  };

  return (
    <Styled.ScoreboardItem disabled={disconnected}>
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
      {disconnected && (
        <Styled.DisconnectedIcon data-tip data-for={`scoreboard-disconnected-${id}`}>
          <Styled.DisconnectedIconContainer>
            <RiWifiOffLine />
          </Styled.DisconnectedIconContainer>
          <Tooltip id={`scoreboard-disconnected-${id}`} tooltipProps={{ place: 'left' }}>
            {t('scoreboard.disconnectedTooltip')}
          </Tooltip>

        </Styled.DisconnectedIcon>
      )}

    </Styled.ScoreboardItem>
  );
};

export default ScoreboardItem;
