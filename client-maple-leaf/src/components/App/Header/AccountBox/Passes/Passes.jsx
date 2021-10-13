import React from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./Passes.module.scss";

const Passes = ({ userData, logoutHandler }) => {
  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <div className={styles.avatar}>
          <img src={userData.avatar} alt="Users avatar" />
        </div>
        <span className={styles.name}>{userData.name}</span>
      </div>
      <div className={styles.dropdown}>
        <ul>
          <li>
            <NavLink to="/account/:">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Profile</NavLink>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
            {/* <NavLink to="/logout">Logout</NavLink> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Passes;
