import React from "react";
import * as styles from "./ScoreElement.module.scss";

const ScoreElement = ({
  data: { id, avatar, username, progress, points, color }
}) => {
  return (
    <div id={id} className={styles.container}>
      <div className={styles.avatarContainer}></div>
      <div className={styles.info}>
        <label className={styles.username}>{username}</label>
        <div className={styles.progressContainer}>
          <span className={styles.points}>{points}</span>
          <div className={styles.progress}>
            <span style={{ width: `${progress * 100}%` }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreElement;
