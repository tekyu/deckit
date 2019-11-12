import React from "react";
import * as styles from "./RoomCard.module.scss";
import {Link} from 'react-router-dom';

const RoomCard = ({ handler, options, isAnonymous }) => {
	const {
		id,
		name,
		createdBy,
		createdById,
		createdAt,
		playersCurrent,
		playersMax,
		isPublic,
		gameCode,
		gameOptions
	} = options;
	const deckList = gameOptions.decks.map(deck => {
		return <span className={styles.deckName}>{deck}</span>;
	});

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
						<span>{playersCurrent}</span>
						<span>{playersMax}</span>
					</div>
					<div className={styles.mode}>
						{isPublic ? "Public" : "Private"}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<Link
					className="button--primary"
					// onClick={handler}
					to={`/game/${id}`}
					value={id}>
					{isAnonymous ? "Play as anonymous" : "Join"}
				</Link>
			</div>
		</div>
	);
};

export default RoomCard;
