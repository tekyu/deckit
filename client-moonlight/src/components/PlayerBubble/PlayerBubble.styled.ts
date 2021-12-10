import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const PlayerBubble = styled.div<{ ready: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-family: ${({ theme: { typography } }) => typography.primary};
  transition: background 0.2s ease-in-out;
  background: ${({ theme: { palette }, ready }) => (ready ? palette.success.main : 'initial')};
  color: ${({ theme: { palette }, ready }) => (ready ? palette.success.contrastText : 'initial')};
  padding: 10px 0;
  width: 100%;
  border-radius: 6px;
  margin: 4px 0;
  ${mediaQuery.greaterThan('waitingScreen')`
    flex-direction: column;
    margin: 10px;
    width: auto;
    max-width: 160px;
    padding: 0;
    border-radius: 0;
    color: ${({ theme: { palette } }) => palette.colors.primary};
    background: initial;
  `};
`;

export const Bubble = styled.div<{ ready: boolean }>`
  display: inline-flex;
  border-radius: 50%;
  font-size: 2rem;
  padding: 10px;
  transition: color 0.2s ease-in-out;
  color: ${({ theme: { palette }, ready }) => (ready ? palette.success.contrastText : palette.colors.primary)};

  
  ${mediaQuery.greaterThan<{ ready: boolean }>('waitingScreen')`
    font-size: 4rem;  
    padding: 0px;
    position: relative;
    color: ${({ theme: { palette }, ready }) => (ready ? palette.success.main : palette.colors.primary)};
  `};
`;

export const Name = styled.div<{ hasFullInfoBox: boolean }>`
  font-size: 16px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: ${({ hasFullInfoBox }) => (hasFullInfoBox ? '5px' : '40px')};
  
  ${mediaQuery.greaterThan('waitingScreen')`
    padding-bottom: 4px;
    margin-top: 10px;
    margin-right: 0px;
  `};

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
  margin-right: 10px;
  ${mediaQuery.greaterThan('waitingScreen')`
    width: 100%;
    margin-right: 0; 
    margin-top: 10px;
  `};
`;

export const Kick = styled.div`
  position: absolute;
  background: ${({ theme: { palette } }) => palette.error.main};
  color: ${({ theme: { palette } }) => palette.error.contrastText};
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
