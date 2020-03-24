import React from "react";
import * as styles from "./ScoreElement.module.scss";

const ScoreElement = ({
  player: { id, avatar, username, color },
  score,
  progress = 0
}) => {
  console.log("progress", progress);
  return (
    <div id={id} className={styles.container}>
      <div className={styles.avatarContainer}></div>
      <div className={styles.info}>
        <label className={styles.username}>{username}</label>
        <div className={styles.progressContainer}>
          <span className={styles.points}>{score}</span>
          <div className={styles.progress}>
            <span style={{ width: `${progress}%` }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreElement;
