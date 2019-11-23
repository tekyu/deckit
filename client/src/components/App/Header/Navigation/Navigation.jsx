import React from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink to="/browse">Browse</NavLink>
        </li>
        <li>
          <NavLink to="/create">Your games</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
