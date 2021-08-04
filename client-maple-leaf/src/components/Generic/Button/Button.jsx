import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Button.styled';

const Button = ({
  children, className, onClick, styles, type,
}) => (
  <Styled.DUIButton
    className={className}
    onClick={onClick}
    styles={styles}
    type={type}
  >
    {children}
  </Styled.DUIButton>
);

Button.defaultProps = {
  styles: [],
  type: 'button',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => { },
  className: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default memo(Button);
