import { ThemeChanger } from 'components/ThemeChanger/ThemeChanger.styled';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const Menu = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  z-index: 100;
  transition: margin 0.2s ease-in-out;
  margin-right: auto;
  ${mediaQuery.greaterThan('medium')`
    margin-left: 6vw;
  `};
`;

export const BurgerMenuContainer = styled.div`
  ${mediaQuery.greaterThan('menu')`
    display: none;
  `}; 
`;

export const HeaderMenu = styled.div`
  display: none;
  ${mediaQuery.greaterThan('menu')`
    display: flex;
  `}; 
`;

export const Nav = styled.div`
  margin-top: 6vh;
  display: flex !important;
  flex-direction: column;
`;

export const LogoInBurger = styled.div`
  position: absolute;
  top: 12px;
  left: 25px;
  border: 2px solid ${({ theme: { palette } }) => palette.backgrounds.primary};
  border-radius: 50%;
`;

export const ThemeChangerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.primary.contrastText};
  padding: 14px 12px;
  margin: 10px 0;
  ${ThemeChanger} {
    margin: 0;
    height: 25px;
  }
`;
