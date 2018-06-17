import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../cards/components/Card";
import "./CardBoard.css";

class CardBoard extends Component {
	state = {
		cards: [],
		reassure: false,
		selectedCard: null
	};

	onClickedHandler = id => {
		this.setState({
			reassure: !this.state.reassure,
			selectedCard: id === this.state.selectedCard ? null : id
		});
	};

	onReassureHandler = data => {
		this.props.socket.emit("sendRoundCard", {
			pickedCard: this.state.selectedCard,
			room: this.props.roomInfo.id
		});
	};

	static getDerivedStateFromProps(newProps, oldState) {
		if (!newProps.roomInfo || !newProps.socket) {
			return {
				...oldState
			};
		}

		return {
			...oldState,
			cards: newProps.roomInfo.pickedCards
				? newProps.roomInfo.pickedCards
				: [],
			stage: newProps.roomInfo.stage,
			amIHinter:
				newProps.roomInfo.hinter === newProps.socket.id ? true : false
		};
	}

	render() {
		let cards = null;
		if (this.state.cards.length > 0) {
			let cardProps = {
				onReassureHandler: this.onReassureHandler,
				reassure: this.state.selectedCard
			};

			cards = this.state.cards.map(card => {
				cardProps.data = card.card;
				cardProps.key = card.id;

				if (this.state.stage === "roundable" && !this.state.amIHinter) {
					cardProps.onClickedHandler = this.onClickedHandler;
				}
				return <Card {...cardProps} />;
			});
		}

		return (
			<div className="cardboard-wrapper">
				<div className="cardboard-container">{cards}</div>
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
)(CardBoard);
