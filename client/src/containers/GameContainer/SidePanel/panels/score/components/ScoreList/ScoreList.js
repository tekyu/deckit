import React, { memo } from "react";
import styled from "styled-components";
import ScoreElement from "../ScoreElement";

const StyledContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ScoreList = ({ data = [] }) => {
  const scores = data.map(score => {
    return <ScoreElement key={score.id} data={score} />;
  });
  return <StyledContainer>{scores}</StyledContainer>;
};

export default memo(ScoreList);
