import React, { Component } from "react";
import * as styles from "./CreateGame.module.scss";

class CreateGame extends Component {
	state = {};
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.form}>
					<label className={styles.header}>Create room</label>
					<div className={styles.formGroup}>
						<label for="name">Name of the room</label>
						<input
							name="name"
							id="name"
							type="text"
							placeholder="Write it here!"
						/>
					</div>
					<div className={styles.formGroup}>
						<label for="players">Number of players</label>
						<input
							name="players"
							id="players"
							type="text"
							placeholder="Write it here!"
						/>
					</div>
					<div className={styles.formGroup}>
						<label for="ispublic">Private room?</label>
						<input
							name="ispublic"
							id="ispublic"
							type="text"
							placeholder="Write it here!"
						/>
					</div>
					<div className={styles.formGroup}>
						<label for="password">Password</label>
						<input
							name="password"
							id="password"
							type="text"
							placeholder="Write it here!"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateGame;
