import React from "react";
import Logo from "components/Generic/Logo/Logo";
import Navigation from "./Navigation/Navigation";
import * as styles from "./Header.module.scss";
import AccountBox from "./AccountBox/AccountBox";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <AccountBox />
    </header>
  );
};

export default Header;
