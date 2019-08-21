import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAuth } from "store/actions/user";
import dynamicSort from "utils/dynamicSort";
import RoomList from "./RoomList/RoomList";
import Sort from "./Sort/Sort";
import mockRooms from "./mockRooms";

class Browse extends Component {
	state = {
		rooms: mockRooms
	};

	sortHandler = options => {
		const { searchPhrase, sortBy } = options;
		const newRooms = mockRooms.filter(room =>
			room[sortBy].includes(searchPhrase)
		);
		this.setState(() => {
			return { rooms: newRooms.sort(dynamicSort(sortBy)) };
		});
	};

	selectHandler = ({ target }) => {
		console.log("selectHandler", target, target.value);
	};

	componentDidMount() {
		this.props.checkAuth();
	}

	render() {
		return (
			<React.Fragment>
				<Sort handler={this.sortHandler} />
				<RoomList
					rooms={this.state.rooms}
					handler={this.selectHandler}
					isAnonymous={!this.auth}
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
