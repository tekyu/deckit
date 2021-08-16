import React from 'react';
import * as Styled from './Blocker.styled';

const Blocker = (): JSX.Element => (
  <Styled.Container>
    <Styled.Message>You already picked a card</Styled.Message>
  </Styled.Container>
);

export default Blocker;
