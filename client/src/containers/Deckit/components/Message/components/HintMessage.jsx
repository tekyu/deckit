import React from "react";
import styled from "styled-components";
import StageMessage from "./StageMessage";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHintContainer = styled.div`
  margin-bottom: 10px;
  span {
    display: block;
  }
`;

const StyledHintLabel = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.78);
`;

const StyledHint = styled.span`
  font-size: 24px;
  margin-top: 4px;
`;

const HintMessage = ({ hint, stage, isHinter }) => {
  return (
    <StyledContainer>
      <StyledHintContainer>
        <StyledHintLabel>Your hint is</StyledHintLabel>
        <StyledHint>{hint}</StyledHint>
      </StyledHintContainer>
      <StageMessage stage={stage} isHinter={isHinter} />
    </StyledContainer>
  );
};

export default HintMessage;
