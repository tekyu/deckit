import React from "react";
import * as Styled from "./Navigation.styled";

const Navigation = () => (
  <Styled.Nav>
    <Styled.List>
      <li>
        <Styled.FastGameContainer>
          <Styled.Link to="/queue">Fast Game</Styled.Link>
          <Styled.ComingSoon>Coming soon</Styled.ComingSoon>
        </Styled.FastGameContainer>
      </li>
    </Styled.List>
  </Styled.Nav>
);

export default Navigation;
