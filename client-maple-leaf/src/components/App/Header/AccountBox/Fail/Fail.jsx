import React from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./Fail.module.scss";

const Fail = () => {
  return (
    <div className={styles.container}>
      <NavLink to="/login" className={styles.login}>
        Log in
      </NavLink>
      or
      <NavLink to="/register" className={styles.register}>
        Register
      </NavLink>
    </div>
  );
};

export default Fail;
