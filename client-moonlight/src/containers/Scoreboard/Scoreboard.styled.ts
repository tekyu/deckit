import { rgba } from 'polished';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const Scoreboard = styled.div`
  font-family: ${({ theme }) => theme.typography.primary};
  background: ${({ theme: { palette } }) => palette.backgrounds.secondary};
  font-size: 14px;
  width: 100%;
  margin: 4px;
  align-self: flex-start;
  padding-bottom: 30px;
  display: none;
  max-height: calc(100vh - 70px);
  ${({ theme: { palette } }) => `
    border: 2px solid ${rgba(palette.primary.light, 1)};
  `}
  ${mediaQuery.greaterThan('medium')`
      display: block;
  `};
  ${mediaQuery.greaterThan('small')`
    max-width: 270px;
  `};
    ${mediaQuery.greaterThan('large')`
    max-width: 330px;
    min-width: 300px;
  `};
  ${mediaQuery.greaterThan('large')`
    max-width: 360px;
    min-width: 300px;
  `};
`;

export const Header = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const List = styled.div`
  overflow: auto;
  height: 100%;
`;

export const ScoreboardEntry = styled.div`
  color: ${({ theme: { palette } }) => palette.colors.primary};
  display: flex;
  align-items: center;
  margin: 1px 0;
  padding: 15px 10px;
  position: relative;
  &:not(:last-of-type) {
  ${({ theme: { palette } }) => `
    border-bottom: 1px solid ${rgba(palette.colors.secondary, 0.2)};
  `}
  }

`;
