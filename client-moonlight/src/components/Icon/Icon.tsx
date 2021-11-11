import React from 'react';

import IIcon from 'components/Icon/IIcon';
import * as Styled from './Icon.styled';

const Icon = ({
  className = '',
  children,
  clickable = true,
  color = 'primary',
  onClick = () => { },
}: IIcon): JSX.Element => (
  <Styled.Icon
    className={className}
    onClick={onClick}
    color={color}
    clickable={clickable}
  >
    {children}
  </Styled.Icon>
);

export default Icon;
