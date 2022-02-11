import { IScoreboardHeader } from 'components/ScoreboardHeader/IScoreboardHeader';
import Tooltip from 'components/Tooltip/Tooltip';
import {
  GiPokerHand, GiRollingDices,
} from 'react-icons/gi';
import { AiOutlineTrophy } from 'react-icons/ai';
import * as Styled from './ScoreboardHeader.styled';

const ScoreboardHeader = ({
  round,
  maxScore,
  remainingCards,
}: IScoreboardHeader): JSX.Element => (
  <Styled.ScoreboardHeader>
    <Styled.InfoContainer data-tip data-for="scoreboard-header-round" className="round">
      <Styled.Text>
        {round}
      </Styled.Text>
      <GiRollingDices />
      <Tooltip id="scoreboard-header-round" tooltipProps={{ place: 'right' }}>
        Round
      </Tooltip>
    </Styled.InfoContainer>
    <Styled.InfoContainer data-tip data-for="scoreboard-header-maxscore" className="maxScore">
      <Styled.Text>
        {maxScore}
      </Styled.Text>
      <AiOutlineTrophy />
      <Tooltip id="scoreboard-header-maxscore" tooltipProps={{ place: 'bottom' }}>
        Points needed to win
      </Tooltip>
    </Styled.InfoContainer>
    <Styled.InfoContainer data-tip data-for="scoreboard-header-remainingcards">
      <Styled.Text>
        {remainingCards}
      </Styled.Text>
      <GiPokerHand />
      <Tooltip id="scoreboard-header-remainingcards" tooltipProps={{ place: 'left' }}>
        Remaining cards
      </Tooltip>

    </Styled.InfoContainer>
  </Styled.ScoreboardHeader>
);

export default ScoreboardHeader;
