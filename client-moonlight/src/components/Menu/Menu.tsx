import Logo from 'components/Logo/Logo';
import NavItem from 'components/NavItem/NavItem';
import { slide as ReactBurgerMenu } from 'react-burger-menu';
import {
  BiArrowBack,
} from 'react-icons/bi';
import { ITheme } from 'theme/themes';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { appSelectors } from 'store/app/appSlice';
import ThemeChanger from 'components/ThemeChanger/ThemeChanger';
import LanguageSwitch from 'components/LanguageSwitch/LanguageSwitch';
import { useTranslation } from 'react-i18next';
import * as Styled from './Menu.styled';

const getStylesForHamburger = (theme: ITheme) => ({
  bmBurgerButton: {
    position: 'relative',
    width: '20px',
    height: '12px',
    marginLeft: '4vw',
  },
  bmBurgerBars: {
    background: theme.palette.primary.main,
  },
  bmBurgerBarsHover: {
    background: theme.palette.primary.dark,
  },
  bmCrossButton: {
    height: '30px',
    width: '30px',
    top: '20px',
    right: '25px',
  },
  bmCross: {
    color: theme.palette.secondary.contrastText,
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: '0',
    left: '0',
  },
  bmMenu: {
    background: theme.palette.primary.main,
    padding: '70px 28px 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: '0',
    left: '0',
  },
});

const Menu = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useSelector(appSelectors.theme);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleStateChange = ({ isOpen }: { isOpen: boolean }) => {
    setIsOpen(isOpen);
  };

  const closeMenuHandler = () => {
    setIsOpen(false);
  };
  return (
    <Styled.Menu>
      <Styled.BurgerMenuContainer>
        <ReactBurgerMenu
          isOpen={isOpen}
          onStateChange={handleStateChange}
          styles={getStylesForHamburger(theme)}
          customCrossIcon={<BiArrowBack />}
        >
          <Styled.LogoInBurger>
            <Logo />
          </Styled.LogoInBurger>
          <Styled.Nav>
            <NavItem onClick={closeMenuHandler} hamburger comingSoon>Fast Game</NavItem>
            <NavItem onClick={closeMenuHandler} hamburger exact to="/">Browse</NavItem>
            <NavItem onClick={closeMenuHandler} hamburger to="/create">Create Game</NavItem>
            <Styled.ThemeChangerContainer>
              Change theme
              <ThemeChanger />
            </Styled.ThemeChangerContainer>
            <LanguageSwitch />

          </Styled.Nav>
        </ReactBurgerMenu>
      </Styled.BurgerMenuContainer>
      <Styled.HeaderMenu>
        <NavItem comingSoon>{t('menu.fastGame')}</NavItem>
        <NavItem exact to="/">{t('menu.browse')}</NavItem>
        <NavItem to="/create">{t('menu.createGame')}</NavItem>

      </Styled.HeaderMenu>
    </Styled.Menu>
  );
};

export default Menu;
