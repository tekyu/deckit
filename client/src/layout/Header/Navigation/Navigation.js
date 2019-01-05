import React from "react";
import * as styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
const Navigation = ({ auth }) => {
	console.log("NAVIGATION");
	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				<li>
					<NavLink to="/browse">Browse</NavLink>
				</li>
				<li>
					<NavLink to="/create">Create</NavLink>
				</li>
				<li>
					<NavLink to="/create">Your games</NavLink>
				</li>
			</ul>
		</nav>
	);
};
export default Navigation;
