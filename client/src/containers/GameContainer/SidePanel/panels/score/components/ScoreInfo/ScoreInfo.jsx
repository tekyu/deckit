import React from "react";
import { useSelector } from "react-redux";
import { deckitSelectors } from "store/selectors";
import * as Styled from "./ScoreInfo.styled";

const ScoreInfo = () => {
  const round = useSelector(deckitSelectors.round);
  const maxScore = useSelector(deckitSelectors.maxScore);

  return (
    <Styled.Container>
      <Styled.RoundContainer>
        <div>Round</div>
        {` `}
        <div>{round}</div>
      </Styled.RoundContainer>
      <Styled.MaxScoreContainer>
        <div>Max score</div>
        {` `}
        <div>{maxScore}</div>
      </Styled.MaxScoreContainer>
    </Styled.Container>
  );
};

export default ScoreInfo;
