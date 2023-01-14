import { ReadyButton } from 'components/ReadyButton/ReadyButton.styled';
import { rgba } from 'polished';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const PlayerBubble = styled.div<{ ready: boolean }>`  
  position: relative;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-family: ${({ theme: { typography } }) => typography.primary};
  transition: background 0.2s ease-in-out;
  background: ${({ theme: { palette }, ready }) => (ready ? palette.primary.main : rgba(palette.primary.light, 0.1))};
  color: ${({ theme: { palette }, ready }) => (ready ? '#fff' : palette.primary.main)};
  padding: 10px;
  width: 130px;
  max-width: 130px;
  height: 170px;
  margin: 0;
  ${ReadyButton} {
    margin-top: auto;
  }
  ${({ theme: { palette } }) => `
      border: 2px solid ${rgba(palette.primary.light, 0.3)};
      border-radius: 6px;
    `}
  ${mediaQuery.greaterThan('waitingScreen')`
    flex-direction: column;
  `};
`;

export const Bubble = styled.div<{ ready: boolean }>`
  display: inline-flex;
  border-radius: 50%;
  font-size: 80px;
  padding-top: 20px;
  transition: color 0.2s ease-in-out;
  color: ${({ theme: { palette }, ready }) => (ready ? '#fff' : palette.primary.main)};

`;

export const Name = styled.div<{ hasFullInfoBox: boolean }>`
  text-align: center;
  font-size: 16px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Owner = styled.div`
  font-size: 10px;
  margin: 0 4px;
  text-transform: uppercase;
  line-height: 1.2em;
  text-align: center;
  ${mediaQuery.greaterThan('waitingScreen')`
    line-height: initial;
  `};
`;

export const You = styled.div`
  font-size: 10px;
  margin: 0 4px;
  text-transform: uppercase;
  line-height: 1.2em;
  text-align: center;
  ${mediaQuery.greaterThan('waitingScreen')`
    line-height: initial;
  `};
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
`;

export const Kick = styled.div<{ ready?: boolean }>`
  position: absolute;
  background: ${({ theme: { palette } }) => palette.primary.main};
  // TODO: Dec-25 Add shades to palette
  color: ${({ theme: { palette }, ready }) => (ready ? '#fff' : rgba(54, 39, 43, 1))};
  font-size: 20px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  ${mediaQuery.greaterThan('waitingScreen')`
    top: 4px;
    right: 4px;
    transform: translateY(0%);
    width: 18px;
    height: 18px;
  `};
`;

export const Empty = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-weight: 300;
  border: 2px solid ${({ theme: { palette } }) => rgba(palette.primary.main, 0.3)};
  color: ${({ theme: { palette } }) => rgba(palette.primary.main, 0.3)};
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-top: 26px;
`;
