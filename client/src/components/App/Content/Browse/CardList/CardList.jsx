import React from 'react';
import PropTypes from 'prop-types';
import RoomCard from './RoomCard';
import * as styles from './CardList.module.scss';

const CardList = ({ rooms }) => {
  const roomList = rooms.map(room => {
    return <RoomCard key={room.id} options={room} />;
  });
  return <div className={styles.container}>{roomList}</div>;
};

CardList.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default CardList;
