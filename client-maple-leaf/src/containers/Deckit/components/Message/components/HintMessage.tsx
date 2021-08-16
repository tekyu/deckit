import React from 'react';
import StageMessage from './StageMessage';
import * as Styled from './HintMessage.styled';

interface IHintMessage {
  hint?: string;
  stage?: number;
  isHinter?: boolean
}

const HintMessage = ({ hint = 'Default hint', stage = 1, isHinter = false }: IHintMessage): JSX.Element => (
  <Styled.Container>
    <Styled.HintContainer>
      <Styled.HintLabel>Your hint is</Styled.HintLabel>
      <Styled.Hint>{hint}</Styled.Hint>
    </Styled.HintContainer>
    <StageMessage stage={stage} isHinter={isHinter} />
  </Styled.Container>
);

export default HintMessage;
