import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledMessage = styled.p`
  color: rgba(0, 0, 0, 0.78);
`;

const StageMessage = ({ stage, isHinter }) => {
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
        <StyledMessage>Choose the card you think is hinter's</StyledMessage>
      );
    case 5:
      return <StyledMessage>Next round will start shortly</StyledMessage>;
    default:
      return (
        <StyledMessage>{`You shouldn't be able to see this. Stage: ${stage}`}</StyledMessage>
      );
  }
};

StageMessage.propTypes = {
  stage: PropTypes.number.isRequired,
  isHinter: PropTypes.bool.isRequired,
};

export default StageMessage;
