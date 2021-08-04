import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HinterPlayer from './components/HinterPlayer';

const StyledMessage = styled.div`
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

HinterStage.propTypes = {
  hinter: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default HinterStage;
