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
  ...rest
}: IButton): JSX.Element => (
  <Styled.Button
    className={className}
    type={type}
    palette={palette}
    variant={variant}
    version={version}
    onClick={onClick}
    {...rest}
  >
    {children}
  </Styled.Button>
);

export default Button;
