import React, { memo, useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { checkAuth, emitter, listener, removeListener } from "store/actions";
import axios from "utils/axios";
import dynamicSort from "utils/dynamicSort";
import { Button } from "components/Generic";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as Styled from "./Browse.styled";

const Browse = ({ auth, checkAuth, emitter, rooms }) => {
  const [parsedRooms, setParsedRooms] = useState([]);
  const dispatch = useDispatch();
  const refreshList = useCallback(() => {
    emitter(`getRooms`, null, rooms => {
      console.log("getRooms", rooms);
      setParsedRooms(rooms);
    });
    axios.get(`/api/getRooms`).then(() => {});
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
    console.log("updateListOfRooms", data, parsedRooms);
    setParsedRooms(oldRooms => {
      const newRooms = { ...oldRooms };
      data.forEach(({ id, action, room }) => {
        console.log("roomAction", id, action, room, newRooms);
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
      console.log("000000 updateListOfRooms", newRooms);
      return newRooms;
    });
  };
  const removeRoomFromList = ({ roomId }) => {
    setParsedRooms(oldRooms => {
      const newRooms = { ...oldRooms };
      delete newRooms[roomId];
      console.log("removeRoomFromList 0000", newRooms, newRooms[roomId]);
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
          key={room.roomId}
          options={room}
          handler={selectHandler}
          isAnonymous={!isAuthorized}
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
  emitter: PropTypes.func.isRequired
};

const mapStateToProps = ({
  roomList: { roomList },
  user: { isAuthorized }
}) => {
  return {
    isAuthorized,
    roomList
  };
};

export default Browse;
