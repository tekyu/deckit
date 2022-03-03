import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch.styled';
import { Logo } from 'components/Logo/Logo.styled';
import { ThemeChanger } from 'components/ThemeChanger/ThemeChanger.styled';
import { rgba } from 'polished';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  z-index: 100;
  background: ${({ theme }) => theme.palette.backgrounds.secondary};
  ${({ theme }) => !theme.isDarkMode && `
    border-bottom: 1px solid ${rgba(theme.palette.primary.light, 0.1)};
  `}
  padding: 0 20px;
  ${mediaQuery.lessThan('medium')`
    justify-content: space-between;    
    padding: 0 10px;
  `};

  ${Logo} {
    ${mediaQuery.lessThan('medium')`
      width: 40px;
      height: 40px;
      font-size: 13px;
    `};    
  }

  & > ${ThemeChanger} {
    margin-left: auto;
    margin-right: 20px;
    ${mediaQuery.lessThan('menu')`
      display: none;
    `};  
  }

  
  & > ${LanguageSwitch} {
    ${mediaQuery.lessThan('menu')`
      display: none;
    `};  
  }
  
`;
