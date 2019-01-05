import React from "react";
import * as styles from "./RoomCard.module.scss";
const RoomCard = ({ settings, handler }) => {
	const {
		id,
		name,
		createdBy,
		createdById,
		createdAt,
		playersCurrent,
		playersMax,
		decks
	} = settings;
	const deckList = decks.map(deck => {
		return <span className={styles.deckName}>{deck}</span>;
	});
	return (
		<div className={styles.container}>
			<span className={styles.owner}>
				<a>{createdBy}</a>
			</span>
			<div className={styles.cover} />
			<div className={styles.controls}>
				<label className={styles.name}>{name}</label>
				<div className={styles.deckList}>{deckList}</div>
				<span className={styles.players}>
					{playersCurrent}
					<span class={styles.playersDivider}>/</span>
					{playersMax}
				</span>
				<button
					type="button"
					className={styles.button}
					roomId={id}
					onClick={handler}>
					>
				</button>
			</div>
		</div>
	);
};

export default RoomCard;
