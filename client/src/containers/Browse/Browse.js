import React, { Component } from "react";
// import RoomCard from "@components/RoomCard/RoomCard";
import CardList from "@components/CardList/CardList";
import Sort from "./Sort/Sort";
import { connect } from "react-redux";
import axios from "@app/axios";
import { checkAuth } from "@store/actions/user";
class Browse extends Component {
	state = {
		rooms: [
			{
				id: "123",
				name: "Room 1",
				createdBy: "tekoy",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "6",
				playersMax: "10",
				isPublic: true,
				gameCode: "d",
				gameOptions: {
					decks: ["standard"]
				}
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				isPublic: false,
				gameCode: "d",
				gameOptions: {
					decks: ["wholesome", "countries"]
				}
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				isPublic: true,
				gameCode: "k",
				gameOptions: {
					decks: ["wholesome", "countries"]
				}
			}
		]
	};

	joinHandler(event) {
		console.log("joinHandler", event.target.getAttribute("roomId"));
	}

	sortHandler(event) {
		console.log("sortHandler");
	}

	componentDidMount() {
		this.props.checkAuth();
		// axios.post("/api/check").then(response => {
		// 	console.log("response", response);
		// });
	}

	render() {
		return (
			<React.Fragment>
				{/* <Sort handler={this.sortHandler} /> */}
				<CardList
					rooms={this.state.rooms}
					handler={this.joinHandler}
					sort="ASC_CREATEDAT"
					view="cards"
				/>
			</React.Fragment>
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
	checkAuth
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Browse);
