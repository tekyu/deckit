import React from "react";
import styled from "styled-components";
import HinterPlayer from "./components/HinterPlayer";

const StyledMessage = styled.p`
  padding: 10px;
`;
const HinterStage = ({ hinter: { id } = {}, userId }) => {
  if (id === userId) {
    return (
      <StyledMessage>
        You are choosing the hint. Field will apear after you choose a card
      </StyledMessage>
    );
  }
  return (
    <StyledMessage>
      <HinterPlayer hinterId={id} />
    </StyledMessage>
  );
};

export default HinterStage;
