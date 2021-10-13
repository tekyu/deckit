import React, { memo } from 'react';
import * as Styled from './Button.styled';

interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => { },
  type,
}: IButton): JSX.Element => (
  <Styled.DUIButton
    className={className}
    onClick={onClick}
    type={type}
  >
    {children}
  </Styled.DUIButton>
);

export default memo(Button);
