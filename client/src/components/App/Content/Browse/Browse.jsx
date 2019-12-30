import React, { memo, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkAuth, updateRooms } from "store/actions";
import axios from "utils/axios";
import dynamicSort from "utils/dynamicSort";
import { Button } from "components/Generic";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as Styled from "./Browse.styled";

const Browse = ({ auth, checkAuth, rooms, updateRooms }) => {
  const [parsedRooms, setParsedRooms] = useState([]);
  const refreshList = useCallback(() => {
    axios.get(`/rooms`).then(res => {
      const { rooms } = res.data;
      updateRooms(rooms);
    });
  }, [updateRooms]);
  useEffect(() => {
    checkAuth();
    refreshList();
  }, [checkAuth, refreshList]);
  const selectHandler = useCallback(() => {}, []);
  const sortHandler = useCallback(
    options => {
      const { searchPhrase, sortBy } = options;
      const newRooms = rooms.filter(room => {
        return room[sortBy.fieldName].toString().includes(searchPhrase);
      });
      setParsedRooms(newRooms.sort(dynamicSort(sortBy.fieldName)));
    },
    [rooms]
  );
  const roomCards = parsedRooms
    ? parsedRooms.map(room => (
        <RoomCard
          key={room.roomId}
          options={room}
          handler={selectHandler}
          isAnonymous={!auth}
        />
      ))
    : null;
  return (
    <>
      <Button onClick={refreshList} preset="secondary">
        Refresh
      </Button>
      <Sort sortHandler={sortHandler} />
      {roomCards && <Styled.CardContainer>{roomCards}</Styled.CardContainer>}
    </>
  );
};

Browse.propTypes = {
  auth: PropTypes.bool,
  checkAuth: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
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
  updateRooms
};

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Browse)
);
