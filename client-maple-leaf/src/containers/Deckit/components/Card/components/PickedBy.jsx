import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './PickedBy.styled';

const PickedBy = ({ pickedBy }) => {
  const getPlayers = pickedBy.map(({ id, avatar, color }) => (
    <Styled.Bubble avatar={avatar} color={color} key={id} />
  ));
  return (
    <Styled.Container>
      <p>Picked by</p>
      <Styled.BubblesContainer>{getPlayers}</Styled.BubblesContainer>
    </Styled.Container>
  );
};

PickedBy.defaultProps = {
  pickedBy: [],
};

PickedBy.propTypes = {
  pickedBy: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    color: PropTypes.string,
  })),
};

export default PickedBy;
