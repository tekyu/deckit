import React from "react";
import * as styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
const Logo = () => {
	return (
		<div className={styles.logo}>
			<Link to="/">
				<span>Deckit</span>
			</Link>
		</div>
	);
};

export default Logo;
