import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { checkAuth, emitter, listener, removeListener } from "store/actions";
import styled from "styled-components";
import dynamicSort from "utils/dynamicSort";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as styles from "./Browse.module.scss";
import RoomJoining from "./RoomJoining/RoomJoining";

const StyledSeparator = styled.div`
  text-align: center;
  margin: 24px 0;
  font-size: 18px;
`;

const Browse = ({ auth, checkAuth, emitter, rooms }) => {
  const [parsedRooms, setParsedRooms] = useState([]);
  const dispatch = useDispatch();
  const refreshList = useCallback(() => {
    emitter(`getRooms`, null, rooms => {
      setParsedRooms(rooms);
    });
  }, [emitter]);
  useEffect(() => {
    // checkAuth();
    refreshList();
  }, [refreshList]);
  const selectHandler = useCallback(() => {}, []);
  // const sortHandler = useCallback(
  //   options => {
  //     const { searchPhrase, sortBy } = options;
  //     const newRooms = Object.values(rooms).filter(room => {
  //       return room[sortBy].toString().includes(searchPhrase);
  //     });
  //     setParsedRooms(newRooms.sort(dynamicSort(sortBy)));
  //   },
  //   [rooms]
  // );
  const updateListOfRooms = ({ socketId, data }) => {
    setParsedRooms(oldRooms => {
      const newRooms = { ...oldRooms };
      data.forEach(({ id, action, room }) => {
        switch (action) {
          case "add":
            newRooms[id] = room;
            break;
          case "remove":
            delete newRooms[id];
            break;
          case "update":
            newRooms[id] = { ...room };
            break;
          default:
            throw Error(
              `Action of ${action} isn't one of known actions for rooms [add/update/remove]`
            );
        }
      });
      return newRooms;
    });
  };
  const removeRoomFromList = ({ roomId }) => {
    setParsedRooms(oldRooms => {
      const newRooms = { ...oldRooms };
      delete newRooms[roomId];
      return newRooms;
    });
  };

  useEffect(() => {
    dispatch(listener(`updateListOfRooms`, updateListOfRooms));
    dispatch(listener(`addRoomToList`, updateListOfRooms));
    dispatch(listener(`removeRoomFromList`, removeRoomFromList));
    return () => {
      dispatch(removeListener(`updateListOfRooms`, updateListOfRooms));
      dispatch(removeListener(`addRoomToList`, updateListOfRooms));
      dispatch(removeListener(`removeRoomFromList`, removeRoomFromList));
    };
  }, []);
  const roomCards = parsedRooms
    ? Object.values(parsedRooms).map(room => (
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
      <RoomJoining />
      {/* <Sort sortHandler={sortHandler} /> */}
      <StyledSeparator>Browse rooms</StyledSeparator>
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

const mapStateToProps = ({ auth, room, user }) => {
  return {
    auth,
    rooms: room.rooms,
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
