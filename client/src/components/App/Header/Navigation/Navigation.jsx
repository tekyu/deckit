import React from "react";
import { NavLink } from "react-router-dom";
import * as Styled from "./Navigation.styled";

const Navigation = () => {
  return (
    <Styled.Nav>
      <NavLink to="/browse">Browse</NavLink>
      <NavLink to="/create">Your games</NavLink>
      <NavLink to="/create">Create</NavLink>
    </Styled.Nav>
  );
};

export default Navigation;
