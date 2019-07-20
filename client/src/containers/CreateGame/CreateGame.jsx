import React, { Component } from 'react';
import * as styles from './CreateGame.module.scss';

class CreateGame extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <label className={styles.header}>Create room</label>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name of the room</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Write it here!"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="players">Number of players</label>
            <input
              name="players"
              id="players"
              type="text"
              placeholder="Write it here!"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ispublic">Private room?</label>
            <input
              name="ispublic"
              id="ispublic"
              type="text"
              placeholder="Write it here!"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="text"
              placeholder="Write it here!"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGame;
