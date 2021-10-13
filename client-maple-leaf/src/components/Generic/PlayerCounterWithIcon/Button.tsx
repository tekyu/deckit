import React, { memo } from 'react';
import * as Styled from './Button.styled';

interface IButton {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => { },
  type = 'button',
}: IButton): JSX.Element => (
  <Styled.Button onClick={onClick} type={type}>
    {children}
  </Styled.Button>
);

export default memo(Button);
