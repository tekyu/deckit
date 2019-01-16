import React, { Component } from "react";
import axios from "@app/axios";
import * as styles from "./LoginForm.module.scss";
import InputGroup from "@components/form/InputGroup/InputGroup";
class LoginForm extends Component {
	state = {
		username: "",
		password: "",
		formError: null,
		errors: {
			empty: "It seems like you forgot to fill your",
			"401": `Oops! It looks like you misspelled your username or password`
		}
	};

	inputOnChangeHandler = event => {
		let change = {
			[event.target.name]: event.target.value
		};
		this.setState((state, props) => {
			return change;
		});
	};

	submitLoginHandler = event => {
		event.preventDefault();
		const [username, password] = [this.state.username, this.state.password];
		console.log("username, password", username, password);
		if (!username || !password) {
			this.setState((state, props) => {
				console.log("setsatate", state, props);
				return {
					formError:
						state.errors.empty +
						(!username ? " username" : " password")
				};
			});
			return false;
		}
		axios
			.post("/login", {
				username: username,
				password: password
			})
			.then(response => {
				console.log("response", response);
			})
			.catch(error => {
				console.log("error", error.response);
				this.setState((state, props) => {
					console.log("setsatate", state, props);
					return {
						formError: state.errors[error.response.status]
					};
				});
			});
		console.log("submit", username, password);
	};
	submitRegisterHandler = event => {
		event.preventDefault();
		const [username, password] = [this.state.username, this.state.password];
		console.log("username, password", username, password);
		if (!username || !password) {
			this.setState((state, props) => {
				console.log("setsatate", state, props);
				return {
					formError:
						state.errors.empty +
						(!username ? " username" : " password")
				};
			});
			return false;
		}
		axios
			.post("/register", {
				username: username,
				password: password
			})
			.then(function(response) {
				console.log("response", response);
			})
			.catch(function(error) {
				console.log("error", error);
			});
		console.log("submit", username, password);
	};

	render() {
		return (
			<div className={styles.modal_backdrop}>
				<div className={styles.modal_container}>
					<div className={styles.modal_close} />
					<div className={styles.modal_header}>
						<i className={styles.ikontest} />
						<h2>Login</h2>
						<p>Lets have fun!</p>
					</div>
					<div className={styles.modal_body}>
						<form onSubmit={this.submitLoginHandler}>
							<div className={styles.input_group}>
								<label
									className={styles.input_label}
									htmlFor="username">
									Username
								</label>
								<input
									className={styles.input_input}
									type="text"
									name="username"
									placeholder="Type your username here"
									onChange={this.inputOnChangeHandler}
								/>
							</div>
							<div className={styles.input_group}>
								<label
									className={styles.input_label}
									htmlFor="password">
									Password
								</label>
								<input
									className={styles.input_input}
									type="password"
									name="password"
									placeholder="Type your password here"
									onChange={this.inputOnChangeHandler}
								/>
							</div>
							{this.state.formError ? (
								<div className={styles.form_error}>
									{this.state.formError}
								</div>
							) : null}

							<button type="submit">Login</button>
							<label className={styles.password_recovery}>
								Can't remember your password?{" "}
								<a href="#">Click here!</a>
							</label>
						</form>
					</div>
					<div className={styles.modal_footer}>
						<label className={styles.create_account}>
							You don't have an account yet?{" "}
							<a href="#">Create one here!</a>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
