import React from "react";
import { useSelector } from "react-redux";
import { deckitSelectors } from "store/selectors";
import {
  StyledContainer,
  StyledRoundContainer,
  StyledMaxScoreContainer
} from "./ScoreInfo.styled";

const ScoreInfo = () => {
  const round = useSelector(deckitSelectors.round);
  const maxScore = useSelector(deckitSelectors.maxScore);

  return (
    <StyledContainer>
      <StyledRoundContainer>
        <div>Round</div> <div>{round}</div>
      </StyledRoundContainer>
      <StyledMaxScoreContainer>
        <div>Max score</div> <div>{maxScore}</div>
      </StyledMaxScoreContainer>
    </StyledContainer>
  );
};

export default ScoreInfo;
