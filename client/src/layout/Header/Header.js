import React, { Component } from "react";
import * as styles from "./Header.module.scss";
import Navigation from "@layout/Header/Navigation/Navigation";
import Logo from "@components/Logo/Logo";
import AccountBox from "./AccountBox/AccountBox";
class Header extends Component {
	state = {};
	render() {
		return (
			<header className={styles.header}>
				<Logo />
				<Navigation />
				<AccountBox />
			</header>
		);
	}
}

export default Header;
