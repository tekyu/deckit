import React from 'react';
import RoomCard from './RoomCard';
import * as styles from './CardList.module.scss';

const CardList = ({ rooms, handler }) => {
  const roomList = rooms.map(room => {
    return <RoomCard key={room.id} options={room} handler={handler} />;
  });
  return <div className={styles.container}>{roomList}</div>;
};

export default CardList;
