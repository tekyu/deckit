import Logo from 'components/Logo/Logo';
import React from 'react';

import { Link } from 'react-router-dom';
import AccountBox from 'components/AccountBox/AccountBox';
import Menu from 'components/Menu/Menu';
import ThemeChanger from 'components/ThemeChanger/ThemeChanger';
import LanguageSwitch from 'components/LanguageSwitch/LanguageSwitch';
import * as Styled from './Header.styled';

const Header = (): JSX.Element => (
  <Styled.Header>
    <Link to="/">
      <Logo />
    </Link>
    <Menu />
    <ThemeChanger />
    <LanguageSwitch />
    <AccountBox />
  </Styled.Header>
);

export default Header;
