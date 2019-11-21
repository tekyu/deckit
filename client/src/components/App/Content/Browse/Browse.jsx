import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkAuth, emitter, updateRooms } from "store/actions";
import axios from "utils/axios";
import dynamicSort from "utils/dynamicSort";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as styles from "./Browse.module.scss";

const Browse = ({ auth, checkAuth, emitter, rooms, updateRooms }) => {
  const [parsedRooms, setParsedRooms] = useState([]);
  const refreshList = useCallback(() => {
    emitter(`getRooms`, null, rooms => {
      updateRooms(rooms);
    });
  }, [emitter]);
  useEffect(() => {
    checkAuth();
    refreshList();
  }, []);
  const selectHandler = ({ target }) => {};
  const refreshListHandler = () => {
    refreshList();
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
      ))
    : null;
  return (
    <>
      <button type="button" onClick={refreshList}>
        Refresh
      </button>
      <Sort sortHandler={sortHandler} />
      {roomCards && (
        <div className={styles[`browse__cardlist-container`]}>{roomCards}</div>
      )}
    </>
  );
};

Browse.propTypes = {
  auth: PropTypes.bool,
  checkAuth: PropTypes.func.isRequired,
  emitter: PropTypes.func.isRequired,
  updateRooms: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, room, user }) => {
  return {
    auth,
    rooms: room.rooms,
    user
  };
};

const mapDispatchToProps = {
  checkAuth,
  emitter,
  updateRooms
};

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Browse)
);
