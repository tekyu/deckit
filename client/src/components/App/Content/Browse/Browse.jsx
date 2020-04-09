import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { checkAuth, emitter, listener, removeListener } from "store/actions";
import dynamicSort from "utils/dynamicSort";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import RoomJoining from "./RoomJoining/RoomJoining";
import * as Styled from "./Browse.styled";

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
          case `add`:
            newRooms[id] = room;
            break;
          case `remove`:
            delete newRooms[id];
            break;
          case `update`:
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
  }, [dispatch]);
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
      <Styled.Separator>Browse rooms</Styled.Separator>
      {roomCards && <Styled.CardContainer>{roomCards}</Styled.CardContainer>}
      <Styled.AboutLink to="/about" />
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
