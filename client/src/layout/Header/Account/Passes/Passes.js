import React from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./Passes.module.scss";
const fakeData = {
	_id: "ewrewr34w4532324e3wed23321432erw",
	avatar: "https://via.placeholder.com/200x150",
	name: "Annabel Maverick"
};
const Passes = props => {
	return (
		<div className={styles.container}>
			<div className={styles.display}>
				<div className={styles.avatar}>
					<img src={fakeData.avatar} alt="Users avatar" />
				</div>
				<span className={styles.name}>{fakeData.name}</span>
			</div>
			<div className={styles.dropdown}>
				<ul>
					<li>
						<NavLink to="/account/:">Profile</NavLink>
					</li>
					<li>
						<NavLink to="/settings">Profile</NavLink>
					</li>
					<li>
						<NavLink to="/logout">Profile</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Passes;
