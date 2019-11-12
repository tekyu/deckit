import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAuth } from "store/actions/user";
import { emitter } from "store/actions/socket";
import axios from "utils/axios";
import dynamicSort from "utils/dynamicSort";
import RoomList from "./RoomList/RoomList";
import Sort from "./Sort/Sort";
class Browse extends Component {
  state = {
    rooms: []
  };

  sortHandler = options => {
    const { searchPhrase, sortBy } = options;
    const newRooms = this.state.rooms.filter(room =>
      room[sortBy].includes(searchPhrase)
    );
    this.setState(() => {
      return { rooms: newRooms.sort(dynamicSort(sortBy)) };
    });
  };

  selectHandler = ({ target }) => {
    console.log("selectHandler", target, target.value);
  };

  refreshListHandler = () => {
    this.refreshList();
  };

  refreshList = () => {
    const { emitter } = this.props;
    emitter("getRooms", null, rooms => {
      this.setState(() => {
        return { rooms: rooms };
      });
    });
    axios.get("/getRooms").then(rooms => {});
  };
  componentDidMount() {
    const { checkAuth } = this.props;
    checkAuth();
    this.refreshList();
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" onClick={this.refreshListHandler}>
          Refresh
        </button>
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
  checkAuth,
  emitter
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
