import React from 'react';
import styled from 'styled-components';
import HinterPlayer from './components/HinterPlayer';

const StyledMessage = styled.div`
  padding: 10px;
`;

type hinterType = {
  id: string;
}

interface IHinterStage {
  hinter: hinterType;
  userId: string;
}

const HinterStage = ({ hinter: { id }, userId }: IHinterStage): JSX.Element => {
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
