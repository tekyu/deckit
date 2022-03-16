import { IScoreboardHeader } from 'components/ScoreboardHeader/IScoreboardHeader';
import Tooltip from 'components/Tooltip/Tooltip';
import {
  GiPokerHand, GiRollingDices,
} from 'react-icons/gi';
import { AiOutlineTrophy } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import * as Styled from './ScoreboardHeader.styled';

const ScoreboardHeader = ({
  round,
  maxScore,
  remainingCards,
}: IScoreboardHeader): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Styled.ScoreboardHeader>
      <Styled.InfoContainer data-tip data-for="scoreboard-header-round" className="round">
        <Styled.Text>
          {round}
        </Styled.Text>
        <GiRollingDices />
        <Tooltip id="scoreboard-header-round" tooltipProps={{ place: 'right' }}>
          {t('scoreboard.roundTooltip')}
        </Tooltip>
      </Styled.InfoContainer>
      <Styled.InfoContainer data-tip data-for="scoreboard-header-maxscore" className="maxScore">
        <Styled.Text>
          {maxScore}
        </Styled.Text>
        <AiOutlineTrophy />
        <Tooltip id="scoreboard-header-maxscore" tooltipProps={{ place: 'bottom' }}>
          {t('scoreboard.pointsToWinToolTip')}
        </Tooltip>
      </Styled.InfoContainer>
      <Styled.InfoContainer data-tip data-for="scoreboard-header-remainingcards">
        <Styled.Text>
          {remainingCards}
        </Styled.Text>
        <GiPokerHand />
        <Tooltip id="scoreboard-header-remainingcards" tooltipProps={{ place: 'left' }}>
          {t('scoreboard.remainingCardsTooltip')}
        </Tooltip>

      </Styled.InfoContainer>
    </Styled.ScoreboardHeader>
  );
};

export default ScoreboardHeader;
