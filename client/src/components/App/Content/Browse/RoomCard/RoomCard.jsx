import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as styles from "./RoomCard.module.scss";

const RoomCard = ({ handler, options, isAnonymous }) => {
  const {
    id,
    name,
    createdBy,
    createdById,
    createdAt,
    playersMax,
    mode,
    gameCode,
    gameOptions,
    players
  } = options;
  // const deckList = gameOptions.decks.map(deck => (
  //   <span className={styles.deckName}>{deck}</span>
  // ));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span>{gameCode.toUpperCase()}</span>
        </div>
      </div>
      <div className={styles.content}>
        <label className={styles.name}>{name}</label>
        <p className={styles.owner}>{createdBy}</p>
        <div className={styles.details}>
          <div className={styles.players}>
            <span>{players.length}</span>
            <span>{playersMax}</span>
          </div>
          <div className={styles.mode}>{mode}</div>
        </div>
      </div>
      <div className={styles.footer}>
        <Link className="button--primary" to={`/game/${id}`} value={id}>
          {isAnonymous ? `Play as anonymous` : `Join`}
        </Link>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  handler: PropTypes.func.isRequired,
  isAnonymous: PropTypes.bool
};

export default memo(RoomCard);
