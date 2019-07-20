import React from 'react';
import Routes from 'routes/Routes';
import * as styles from './Content.module.scss';

const Content = auth => {
  return (
    <div className={styles.content}>
      <Routes auth={auth} />
    </div>
  );
};

export default Content;
