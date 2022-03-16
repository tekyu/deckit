import styled from 'styled-components';
import { GiLaurelCrown } from 'react-icons/gi';
import { rgba } from 'polished';
import { mediaQuery } from 'theme/mediaQueries';

export const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  ${({ theme: { palette } }) => `
      background: ${rgba(palette.backgrounds.primary, 0.87)}
  `}
`;

export const Winners = styled.div`
  font-family: ${({ theme: { typography } }) => typography.primary};
  border: 2px solid ${({ theme: { palette } }) => palette.primary.light};
  background: ${({ theme: { palette } }) => palette.backgrounds.primary};
  width: 100%;
  box-sizing: border-box;
  margin-top: 40px;
  ${mediaQuery.greaterThan('small')`
    width: auto;
    min-width: 450px;
    max-width: 760px;
  `};
  ${mediaQuery.greaterThan('medium')`
    min-width: 550px;
  `};
  ${mediaQuery.greaterThan('medium')`
    min-width: 650px;
    max-width: 860px;
  `};
`;

export const Header = styled.div`
  color: ${({ theme: { palette } }) => palette.primary.contrastText};
  background: ${({ theme: { palette } }) => palette.primary.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  font-size: 16px;
`;

export const Headers = styled.div`
  display: flex;
  padding: 10px 15px;
  opacity: 0.54;
`;

export const Announcement = styled.div`

`;

export const Winner = styled.div`
  font-size: 3.2em;
`;

export const WinnerScore = styled.div`
  font-size: 3.4em;
  color: #FFD700;
`;

export const Crown = styled(GiLaurelCrown)`
  font-size: 4.4em;
  color: #FFD700;
`;

export const List = styled.div`
  font-size: 16px;
  font-family: ${({ theme: { typography } }) => typography.primary};
  padding-bottom: 10px;
`;

export const Player = styled.div`
  display: flex;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  padding: 10px 15px;
  &:nth-of-type(1) {
    font-size: 1.8em;
  }
  &:nth-of-type(2) {
    font-size: 1.4em;
  }
`;

export const Place = styled.div`
  text-align: center;
  width: 20px;
  margin-right: 20px;
  
`;
export const Name = styled.div`
  margin-right: auto;
  position: relative;
`;

export const Points = styled.div`
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  > * {
    margin: 0 10px;
  }
`;

export const PlayAgain = styled.div`
  display: flex;
  align-items: center;
`;
export const PlayAgainCounter = styled.div`
  margin-left: 12px;
`;

export const PlayAgainBubble = styled.div`

  position: absolute;
  opacity: 0.87;
  left: 40px;
  top: -26px;
  margin: 4px;
  box-sizing: border-box;
  padding: 8px 24px;
  color: ${({ theme: { palette } }) => palette.primary.textContrast};
  background: ${({ theme: { palette } }) => palette.primary.light};
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  white-space: nowrap;
  &:before {
    content: "";
    width: 15px; 
    height: 15px;
    position: absolute;
    bottom: -2px;
    left: 0px;
    color: ${({ theme: { palette } }) => palette.primary.textContrast};
    background: ${({ theme: { palette } }) => palette.primary.light};
    transform: skew(-15deg, -15deg);
    border-radius: 2px;
  }

  &.play-again-enter {    
    opacity: 0;
    display: flex;
  }
  &.play-again-enter-active {
    opacity: 1;
  }
  &.play-again-enter-done {
    opacity: 1;
    display: flex;
  }
  &.play-again-exit {
    opacity: 1;
    display: flex;
  }
  &.play-again-exit-active {
    opacity: 0;
    transition: opacity 0.2s ease-in-out, top 0.3s ease-in-out;
  }
  &.play-again-exit-done {
    opacity: 0;
    display: none;
  }
`;
