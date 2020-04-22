import React from "react";
import { StyledContainer, StyledMessage } from "./Blocker.styled";

const Blocker = () => {
  return (
    <StyledContainer>
      <StyledMessage>You already picked a card</StyledMessage>
    </StyledContainer>
  );
};

export default Blocker;
