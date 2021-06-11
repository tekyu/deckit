import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import Icon from "components/Generic/Icon/Icon";
import PlayerCounterWithIcon from "components/Generic/PlayerCounterWithIcon/PlayerCounterWithIcon";
import * as styles from "./RoomCard.module.scss";

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
`;

const RoomCard = ({
  options: {
    id, name, createdBy, playersMax, mode, gameCode, players,
  },
}) => (
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
        {mode === `private` && <Icon icon="lock" size={30} />}
      </div>
    </div>
    <div className={styles.footer}>
      <Link to={`/game/${id}`} value={id}>
        <PlayButton variant="contained" color="primary" aria-label="join">
          Join
        </PlayButton>
      </Link>
    </div>
  </div>
);
RoomCard.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.string,
    playersMax: PropTypes.number,
    mode: PropTypes.string,
    gameCode: PropTypes.string,
    players: PropTypes.array,
  }),
};

export default memo(RoomCard);
