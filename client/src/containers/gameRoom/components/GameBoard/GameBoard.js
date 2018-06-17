import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameBoard.css";
import Logo from "../../../../components/ui/logo/logo";
import Cards from "./components/cards/Cards";
import Header from "./components/header/Header";
import CardBoard from "./components/CardBoard/CardBoard";
class GameBoard extends Component {
	state = {
		me: null,
		started: false
	};

	onHintInputHandler = event => {
		this.setState({ hintInput: event.target.value });
	};

	onSendHint = () => {
		let _data = {
			hint: this.state.hintInput,
			hintCard: this.state.hintCard,
			room: this.props.roomInfo.id
		};
		this.props.socket.emit("sendHint", _data);
	};

	static getDerivedStateFromProps(newProps, oldState) {
		if (!newProps.roomInfo || !newProps.socket) {
			return {
				...oldState
			};
		}
		const me = newProps.roomInfo.playersConnected.filter(player => {
			return player.id === newProps.socket.id;
		})[0];

		return {
			...oldState,
			started: newProps.roomInfo.started,
			me: me ? me : []
		};
	}

	render() {
		return (
			<div className="gameboard">
				{!(this.state.started && this.state.me) ? (
					<Logo />
				) : (
					<Header
						socket={this.props.socket}
						me={this.state.me}
						room={
							this.props.roomInfo ? this.props.roomInfo.id : null
						}
					/>
				)}
				{this.state.me ? (
					<CardBoard me={this.state.me} socket={this.props.socket} />
				) : null}
				{this.state.me ? (
					<Cards me={this.state.me} socket={this.props.socket} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roomInfo: state.roomInfo
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameBoard);
