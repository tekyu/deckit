import React from "react";
import PropTypes from "prop-types";
import StageMessage from "./StageMessage";
import * as Styled from './HintMessage.styled';

const HintMessage = ({ hint, stage, isHinter }) => (
  <Styled.Container>
    <Styled.HintContainer>
      <Styled.HintLabel>Your hint is</Styled.HintLabel>
      <Styled.Hint>{hint}</Styled.Hint>
    </Styled.HintContainer>
    <StageMessage stage={stage} isHinter={isHinter} />
  </Styled.Container>
);

HintMessage.defaultProps = {
  hint: `Default hint`,
  stage: 1,
  isHinter: false,
};

HintMessage.propTypes = {
  hint: PropTypes.string,
  stage: PropTypes.number,
  isHinter: PropTypes.bool,
};

export default HintMessage;
