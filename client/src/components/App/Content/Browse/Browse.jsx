import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkAuth } from "store/actions/user";
import { emitter } from "store/actions/socket";
import dynamicSort from "utils/dynamicSort";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as styles from "./Browse.module.scss";

const Browse = ({ auth, checkAuth, emitter }) => {
  const [rooms, setRooms] = useState([]);
  const refreshList = () => {
    emitter(`getRooms`, null, rooms => {
      setRooms(rooms);
    });
  };
  useEffect(() => {
    checkAuth();
    refreshList();
  }, []);
  const selectHandler = ({ target }) => {};
  const refreshListHandler = () => {
    refreshList();
  };
  const sortHandler = options => {
    const { searchPhrase, sortBy } = options;
    const newRooms = rooms.filter(room => room[sortBy].includes(searchPhrase));
    setRooms(newRooms.sort(dynamicSort(sortBy)));
  };
  const roomCards = rooms
    ? rooms.map(room => (
        <RoomCard
          key={room.id}
          options={room}
          handler={selectHandler}
          isAnonymous={!auth}
        />
      ))
    : null;
  return (
    <>
      <button type="button" onClick={refreshListHandler}>
        Refresh
      </button>
      <Sort handler={sortHandler} />
      {roomCards && (
        <div className={styles[`browse__cardlist-container`]}>{roomCards}</div>
      )}
    </>
  );
};

Browse.propTypes = {
  auth: PropTypes.bool,
  checkAuth: PropTypes.func.isRequired,
  emitter: PropTypes.func.isRequired
};

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

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Browse)
);
