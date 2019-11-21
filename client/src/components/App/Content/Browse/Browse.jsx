import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkAuth, emitter } from "store/actions";
import axios from "utils/axios";
import dynamicSort from "utils/dynamicSort";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as styles from "./Browse.module.scss";

const Browse = ({ auth, checkAuth, emitter }) => {
  const [rooms, setRooms] = useState([]);
  const refreshList = useCallback(() => {
    emitter(`getRooms`, null, rooms => {
      setRooms(rooms);
    });
    axios.get(`/getRooms`).then(() => {});
  }, [emitter]);
  useEffect(() => {
    checkAuth();
    refreshList();
  }, [checkAuth, refreshList]);
  const selectHandler = useCallback(() => {}, []);
  const sortHandler = useCallback(
    options => {
      const { searchPhrase, sortBy } = options;
      const newRooms = rooms.filter(room =>
        room[sortBy].includes(searchPhrase)
      );
      setRooms(newRooms.sort(dynamicSort(sortBy)));
    },
    [rooms]
  );
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
