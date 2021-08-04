import React from 'react';
import {
  StyledContainer,
  StyledHeader,
  StyledThanksContainer,
} from './About.styled';

const About = () => (
  <StyledContainer>
    {/* eslint-disable-next-line react/no-unescaped-entities */}
    <StyledHeader>This project wouldn't be possible without:</StyledHeader>
    <StyledThanksContainer>
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>
      {' '}
      from
      {' '}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </StyledThanksContainer>
  </StyledContainer>
);

export default About;
