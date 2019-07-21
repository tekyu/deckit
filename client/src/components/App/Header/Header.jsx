import React, { Component } from 'react';
import Logo from 'components/Logo/Logo';
import Navigation from './Navigation';
import * as styles from './Header.module.scss';
import AccountBox from './AccountBox';

class Header extends Component {
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
