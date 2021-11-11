import React from 'react';

import IButton from 'components/Button/IButton';
import * as Styled from './Button.styled';

const Button = ({
  type = 'button',
  children = 'Default',
  palette = 'primary',
  variant = 'main',
  version = 'contained',
  onClick = () => { },
  className = '',
}: IButton): JSX.Element => (
  <Styled.Button
    className={className}
    type={type}
    palette={palette}
    variant={variant}
    version={version}
    onClick={onClick}
  >
    {children}
  </Styled.Button>
);

export default Button;
