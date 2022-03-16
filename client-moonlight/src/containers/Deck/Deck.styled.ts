import { Card } from 'components/Card/Card.styled';
import { rgba } from 'polished';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const Container = styled.div<{ showCards: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: all 0.3s ease-in;
  bottom: ${({ showCards }) => (showCards ? '0px' : '-200px')};
  left: 0;
  width: 100%;
  position: fixed;
  overflow: hidden;
  transition: all 0.3s ease-in;
  ${({ showCards }) => `
    ${mediaQuery.greaterThan('large')`
      bottom: ${(showCards ? '0px' : '-200px')};
    `};
  `}
  
  &:hover, &:active, &:focus {
    bottom: 0;
  }

`;

export const Deck = styled.div<{ enableDeck: boolean }>`
  padding: 0 40px;
  min-height: 204px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  transition: all 0.3s ease-in;
  position: fixed;
  bottom:0;
  ${({ theme: { palette } }) => `
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(0deg, ${rgba(palette.backgrounds.primary, 0.87)} 0%, ${rgba(palette.backgrounds.primary, 0)} 100%);
      transition: all 0.3s ease-in;
    }
  `}
  ${({ enableDeck }) => !enableDeck && `
    &:after {
      top: 0;
    }
  `}
  ${Card} {
    &:not(:first-of-type) {
      margin-left: -50px;
      ${mediaQuery.greaterThan('medium')`
        margin-left: -50px;
      `};
      ${mediaQuery.greaterThan('large')`
        margin-left: -50px;
      `};
      ${mediaQuery.greaterThan('huge')`
        margin-left: -50px;
      `};
    }
    &:hover, &:active {
      margin-left: 16px;
      margin-right: 16px;
      ${mediaQuery.greaterThan('medium')`
        margin-left: -50px;
      `};
      ${mediaQuery.greaterThan('large')`
        margin-left: -50px;
      `};
      ${mediaQuery.greaterThan('huge')`
        margin-left: 50px;
        `};
      &:not(:first-of-type) {
        ${({ theme }) => `
          box-shadow: 0px 0px 10px 2px ${rgba(theme.palette.primary.light, 1)},
           -29px 0px 24px -15px rgba(0, 0, 0, 0.6);
        `}
        margin-left: -16px;
      }
      &:last-of-type {
        margin-left: -16px;
      }
    }
    &:hover + div {
      &:not(:first-of-type) {
        margin-left: 16px;
        ${mediaQuery.greaterThan('small')`
          margin-left: 16px;
        `};
        ${mediaQuery.greaterThan('medium')`
          margin-left: 16px;
        `};

      }
    }
  }
`;
