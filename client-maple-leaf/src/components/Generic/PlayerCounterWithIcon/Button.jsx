import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Button.styled';

const Button = ({
  children, onClick, styles, type,
}) => (
  <Styled.Button onClick={onClick} styles={styles} type={type}>
    {children}
  </Styled.Button>
);

Button.defaultProps = {
  styles: [],
  type: 'button',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default memo(Button);
