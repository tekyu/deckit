import React from "react";
import Logo from "components/Generic/Logo/Logo";
import Navigation from "./Navigation/Navigation";
import * as Styled from "./Header.styled";
import AccountBox from "./AccountBox/AccountBox";

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
