import React from "react";
import Logo from "components/Generic/Logo/Logo";
import Navigation from "./Navigation/Navigation";
import AccountBox from "./AccountBox/AccountBox";
import * as Styled from "./Header.styled";

const Header = () => {
  return (
    <Styled.Header>
      <Logo />
      <Navigation />
      <AccountBox />
    </Styled.Header>
  );
};

export default Header;
