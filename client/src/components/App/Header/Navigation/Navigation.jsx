import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as styles from "./Navigation.module.scss";

const StyledFastGameContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledComingSoon = styled.span`
  text-transform: uppercase;
  background: #009bff;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  letter-spacing: 0.02;
  margin-left: 10px;
`;

const StyledNavLink = styled.span`
  color: rgba(0, 0, 0, 0.26);
  position: relative;
  cursor: pointer;
`;

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <StyledFastGameContainer>
            <StyledNavLink to="/queue">Fast Game</StyledNavLink>
            <StyledComingSoon>Coming soon</StyledComingSoon>
          </StyledFastGameContainer>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
