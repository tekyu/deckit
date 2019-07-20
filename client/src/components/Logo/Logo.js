import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <span>Deckit</span>
      </Link>
    </div>
  );
};

export default Logo;
