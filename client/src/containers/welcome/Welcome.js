import React, { Component } from "react";
import "./Welcome.css";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import Header from "../../components/welcome/header";
import sillyName from "sillyname";
class Welcome extends Component {
	state = {
		nicknameInput: sillyName(),
		lengthError: false
	};

	getNameHandler = event => {
		this.setState({ nicknameInput: event.target.value });
		if (this.state.nicknameInput.length > 5) {
			this.setState({ lengthError: false });
		} else {
			this.setState({ lengthError: true });
		}
	};

	startGame = () => {
		if (!this.state.lengthError) {
			this.props.setUUID(this.props.socket, this.state.nicknameInput);
		}
	};

	componentDidMount() {
		this.props.socket.on("playerConnected", props => {
			this.props.onStartGame(this.props.socket, props);
		});
	}

	render() {
		let initialComponent = (
			<div className="container welcome-container">
				<Header
					lengthError={this.state.lengthError}
					name={this.state.nicknameInput}
					getNameHandler={this.getNameHandler}
					startGame={this.startGame}
				/>
			</div>
		);
		return <React.Fragment>{initialComponent}</React.Fragment>;
	}
}
const mapStateToProps = state => {
	return {
		testState: state,
		auth: state.auth,
		nickname: state.nickname,
		uuid: state.uuid
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onStartGame: (socket, props) =>
			dispatch(actionCreators.startGame(socket, props)),
		setUUID: (socket, nickname) =>
			dispatch(actionCreators.playerConnect(socket, nickname))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Welcome);
