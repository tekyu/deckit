import React from "react";
import Logo from "components/Generic/Logo/Logo";
import Navigation from "./Navigation/Navigation";
import * as Styled from "./Header.styled";

const Header = () => (
  <Styled.Header>
    <Logo />
    <Navigation />
  </Styled.Header>
);

export default Header;
