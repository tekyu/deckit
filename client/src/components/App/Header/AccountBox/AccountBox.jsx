import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "store/actions/modals";
import * as styles from "./AccountBox.module.scss";
// import { logoutUser } from "@store/actions/user";
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

	componentDidUpdate(prevProps) {
		console.log(
			"%c [AccountBox.js] componentDidUpdate",
			"background:#CCA014",
			this.props,
			prevProps
		);
	}

	openModalHandler = ev => {
		const formName = ev.currentTarget.name;
		this.props.openModal(formName);
	};

	getAuthFalse() {
		return (
			<React.Fragment>
				<button
					onClick={this.openModalHandler}
					name="register"
					type="button"
					className="button--secondary">
					Join
				</button>
				<button
					onClick={this.openModalHandler}
					type="button"
					name="login"
					className="button--primary">
					Login
				</button>
			</React.Fragment>
		);
	}

	getAuthTrue() {
		const { user } = this.props;
		console.log("this", this.props);
		if (!user) {
			return false;
		}
		return (
			<div className={styles.container}>
				<div className={styles.display}>
					<div className={styles.avatar}>
						<img
							src={this.state.userData.avatar}
							alt="Users avatar"
						/>
					</div>
					<span className={styles.name}>
						{this.props.user.username}
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
							<Link to="/logout">Logout</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}

	render() {
		console.log(
			"%c [AccountBox.js] render",
			"background:#80D6C3",
			this.props
		);
		console.log("authtrue", this.props.user);
		return (
			<div className={styles.accountBox_container}>
				{this.props.auth ? this.getAuthTrue() : this.getAuthFalse()}
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

const mapDispatchToProps = {
	openModal
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountBox);
