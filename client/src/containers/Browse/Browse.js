import React, { Component } from "react";
// import RoomCard from "@components/RoomCard/RoomCard";
import CardList from "@components/CardList/CardList";
import Sort from "./Sort/Sort";
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
				public: true,
				decks: ["standard"]
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				public: true,
				decks: ["wholesome", "countries"]
			},
			{
				id: "1235",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "0",
				playersMax: "3",
				public: false,
				decks: ["custom"]
			},
			{
				id: "1236",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "3",
				public: true,
				decks: ["custom"]
			},
			{
				id: "1237",
				name: "test",
				createdBy: "Very long name name name",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "5",
				playersMax: "7",
				public: false,
				decks: ["dream", "nostalgic"]
			},
			{
				id: "123",
				name: "Room 1",
				createdBy: "tekoy",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "6",
				playersMax: "10",
				public: true,
				decks: ["standard"]
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				public: true,
				decks: ["wholesome", "countries"]
			},
			{
				id: "1235",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "0",
				playersMax: "3",
				public: false,
				decks: ["custom"]
			},
			{
				id: "1236",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "3",
				public: true,
				decks: ["custom"]
			},
			{
				id: "1237",
				name: "test",
				createdBy: "Very long name name name",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "5",
				playersMax: "7",
				public: false,
				decks: ["dream", "nostalgic"]
			},
			{
				id: "123",
				name: "Room 1",
				createdBy: "tekoy",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "6",
				playersMax: "10",
				public: true,
				decks: ["standard"]
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				public: true,
				decks: ["wholesome", "countries"]
			},
			{
				id: "1235",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "0",
				playersMax: "3",
				public: false,
				decks: ["custom"]
			},
			{
				id: "1236",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "3",
				public: true,
				decks: ["custom"]
			},
			{
				id: "1237",
				name: "test",
				createdBy: "Very long name name name",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "5",
				playersMax: "7",
				public: false,
				decks: ["dream", "nostalgic"]
			},
			{
				id: "123",
				name: "Room 1",
				createdBy: "tekoy",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "6",
				playersMax: "10",
				public: true,
				decks: ["standard"]
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				public: true,
				decks: ["wholesome", "countries"]
			},
			{
				id: "1235",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "0",
				playersMax: "3",
				public: false,
				decks: ["custom"]
			},
			{
				id: "1236",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "3",
				public: true,
				decks: ["custom"]
			},
			{
				id: "1237",
				name: "test",
				createdBy: "Very long name name name",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "5",
				playersMax: "7",
				public: false,
				decks: ["dream", "nostalgic"]
			},
			{
				id: "123",
				name: "Room 1",
				createdBy: "tekoy",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "6",
				playersMax: "10",
				public: true,
				decks: ["standard"]
			},
			{
				id: "1234",
				name: "Room 2",
				createdBy: "rimyi",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "10",
				public: true,
				decks: ["wholesome", "countries"]
			},
			{
				id: "1235",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "0",
				playersMax: "3",
				public: false,
				decks: ["custom"]
			},
			{
				id: "1236",
				name: "test",
				createdBy: "Testname",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "3",
				playersMax: "3",
				public: true,
				decks: ["custom"]
			},
			{
				id: "1237",
				name: "test",
				createdBy: "Very long name name name",
				createdById: "345",
				createdAt: "1541888514131",
				playersCurrent: "5",
				playersMax: "7",
				public: false,
				decks: ["dream", "nostalgic"]
			}
		]
	};

	joinHandler(event) {
		console.log("joinHandler", event.target.getAttribute("roomId"));
	}

	sortHandler(event) {
		console.log("sortHandler");
	}

	render() {
		return (
			<React.Fragment>
				<Sort handler={this.sortHandler} />
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

export default Browse;
