import React, { Component } from 'react';
import Logo from 'components/Logo/Logo';
import Navigation from './Navigation/Navigation';
import * as styles from './Header.module.scss';
import AccountBox from './AccountBox/AccountBox';

class Header extends Component {
  state = {};

  render() {
    return (
      <header className={styles.header}>
        <Logo />
        <Navigation />
        <AccountBox />
      </header>
    );
  }
}

export default Header;
