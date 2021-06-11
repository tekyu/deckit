import React, { Component } from "react";
import PropTypes from "prop-types";
import RoomCard from "./RoomCard/RoomCard";
import * as styles from "./RoomList.module.scss";

const CardList = ({ handler, rooms, isAnonymous }) => {
  console.log(`CardList`, rooms);
  if (!rooms) {
    return null;
  }
  const roomList = rooms.map((room) => (
    <RoomCard
      key={room.id}
      options={room}
      handler={handler}
      isAnonymous={isAnonymous}
    />
  ));
  return (<div className={styles.container}>{roomList}</div>);
};

RoomCard.propTypes = {
  handler: PropTypes.func,
  // rooms: PropTypes.arrayOf,
  isAnonymous: PropTypes.bool,
};

export default CardList;
