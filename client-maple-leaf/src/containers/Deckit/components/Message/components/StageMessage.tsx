import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.p`
  color: rgba(0, 0, 0, 0.78);
`;

interface IStageMessage {
  stage: number;
  isHinter: boolean
}

const StageMessage = ({ stage, isHinter }: IStageMessage): JSX.Element => {
  switch (stage) {
    case 3:
      if (isHinter) {
        return (
          <StyledMessage>
            Others are choosing their cards. Please wait
          </StyledMessage>
        );
      }
      return (
        <StyledMessage>
          Choose your card that fits best to the hint
        </StyledMessage>
      );
    case 4:
      if (isHinter) {
        return (
          <StyledMessage>
            Others are choosing their cards. Please wait
          </StyledMessage>
        );
      }
      return (
        <StyledMessage>Choose the card you think is hinter&apos;s</StyledMessage>
      );
    case 5:
      return <StyledMessage>Next round will start shortly</StyledMessage>;
    default:
      return (
        <StyledMessage>{`Something's wrong! Stage: ${stage}`}</StyledMessage>
      );
  }
};

export default StageMessage;
