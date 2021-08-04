import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './PlayerBubble.styled';

const PlayerBubble = ({ avatar, color, didPick }) => (
  <Styled.Container avatar={avatar} color={color} didPick={didPick} />
);

PlayerBubble.defaultProps = {
  avatar: '',
  color: '#fff',
  didPick: false,
};

PlayerBubble.propTypes = {
  avatar: PropTypes.string,
  color: PropTypes.string,
  didPick: PropTypes.bool,
};

export default PlayerBubble;
