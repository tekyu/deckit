import React from "react";
import * as styles from "./CardList.module.scss";
import RoomCard from "@components/RoomCard/RoomCard";
const CardList = ({ rooms, handler }) => {
	const roomList = rooms.map(room => {
		return <RoomCard key={room.id} settings={room} handler={handler} />;
	});
	return <div className={styles.container}>{roomList}</div>;
};

export default CardList;
