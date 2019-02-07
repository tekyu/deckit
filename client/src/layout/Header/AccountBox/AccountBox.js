import React, { Component } from "react";
import * as styles from "./AccountBox.module.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { updateModal } from "@store/actions/modals";
import LoginModal from "@modals/LoginModal/LoginModal";
import RegisterModal from "@modals/RegisterModal/RegisterModal";
class AccountBox extends Component {
	state = {
		userData: {
			_id: "ewrewr34w4532324e3wed23321432erw",
			avatar: "https://via.placeholder.com/200x150",
			name: "Annabel Maverick"
		}
	};

	componentDidMount(p, v) {
		console.log("[componentDidMount] [AccountBox.js]", p, v);
	}

	onCloseHandler() {}

	onClickHandler(ev) {
		let formName = ev.currentTarget.name;

		// if (formName === 'register') {
		// }
	}

	render() {
		const authFalse = (
			<div className={styles.accountBox_buttonGroup}>
				<button
					onClick={this.onClickHandler}
					name="register"
					type="button"
					className="button--secondary">
					Join
				</button>
				<button type="button" name="login" className="button--primary">
					Login
				</button>
			</div>
		);

		const authTrue = (
			<div className={styles.container}>
				<div className={styles.display}>
					<div className={styles.avatar}>
						<img
							src={this.state.userData.avatar}
							alt="Users avatar"
						/>
					</div>
					<span className={styles.name}>
						{this.state.userData.name}
					</span>
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
							<NavLink to="/logout">Logout</NavLink>
						</li>
					</ul>
				</div>
			</div>
		);
		return (
			<div className={styles.accountBox_container}>
				{this.props.auth ? authTrue : authFalse}
			</div>
		);
	}
}

const mapStateToProps = ({ auth, user }) => {
	return {
		auth,
		user
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountBox);
