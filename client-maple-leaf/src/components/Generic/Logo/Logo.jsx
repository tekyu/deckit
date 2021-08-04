import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './Logo.styled';

const Logo = () => (
  <Link to="/">
    <Styled.Container>
      <Styled.Text>Deckit</Styled.Text>
    </Styled.Container>
  </Link>
);

export default Logo;
