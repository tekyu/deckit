import React, { memo, useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { checkAuth, getRoomList } from "store/actions";
import dynamicSort from "utils/dynamicSort";
import { Button } from "components/Generic";
import RoomCard from "./RoomCard/RoomCard";
import Sort from "./Sort/Sort";
import * as Styled from "./Browse.styled";

const Browse = ({ isAuthorized, roomList }) => {
  const dispatch = useDispatch();
  const [parsedRooms, setParsedRooms] = useState([]);
  const refreshList = useCallback(() => {
    dispatch(getRoomList());
  }, [dispatch]);
  useEffect(() => {
    dispatch(checkAuth());
    refreshList();
  }, [dispatch, refreshList]);
  const selectHandler = useCallback(() => {}, []);
  const sortHandler = useCallback(
    options => {
      const { searchPhrase, sortBy } = options;
      const newRooms = roomList.filter(room => {
        return room[sortBy.fieldName].toString().includes(searchPhrase);
      });
      setParsedRooms(newRooms.sort(dynamicSort(sortBy.fieldName)));
    },
    [roomList]
  );
  const roomCards = parsedRooms
    ? parsedRooms.map(room => (
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
  isAuthorized: PropTypes.bool.isRequired,
  roomList: PropTypes.array.isRequired
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

export default memo(connect(mapStateToProps)(Browse));
