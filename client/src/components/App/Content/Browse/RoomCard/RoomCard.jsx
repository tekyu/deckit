import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PropTypes from "prop-types";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import * as styles from "./RoomCard.module.scss";
import $Button from "../../../../Generic/Button/Button.styled";
import Icon from "../../../../Generic/Icon/Icon";
import PlayerCounterWithIcon from "../../../../Generic/PlayerCounterWithIcon/PlayerCounterWithIcon";

const PlayIcon = styled(PlayCircleFilledWhiteIcon)`
  fill: red;
  width: 100px;
  height: 100px;
  color: #3c3c3c;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
  &:hover,
  &:focus {
    /* color: linear-gradient(40deg, #16bffd 0%, #cb3066 100%); */
  }
`;
const PlayButton = styled(Button)`
  padding: 16px 32px;
  border-radius: 3px;
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
  /* &:hover,
  &:focus {
    box-shadow: 5px 5px 15px rgba(207, 119, 243, 0.5),
      5px 5px 15px rgba(0, 155, 255, 0.5), -5px 5px 15px rgba(42, 201, 219, 0.5);
  } */
`;

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
          <PlayerCounterWithIcon
            playersNow={players.length}
            playersMax={playersMax}
          />
          {mode === "private" && <Icon icon="lock" size={30} />}
        </div>
      </div>
      <div className={styles.footer}>
        <Link to={`/game/${id}`} value={id}>
          <PlayButton variant="contained" color="primary" aria-label="join">
            Join
          </PlayButton>
          {/* {isAnonymous ? `Play as anonymous` : `Join`} */}
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
