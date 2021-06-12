import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "store/actions";
import { selectAuth } from 'store/user/userSelectors';
import RoomCard from "./RoomCard/RoomCard";
import RoomJoining from "./RoomJoining/RoomJoining";
import * as Styled from "./Browse.styled";

const Browse = () => {
  const [parsedRooms, setParsedRooms] = useState([]);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const refreshList = useCallback(() => {
    dispatch(
      socketActions.emitter(`getRooms`, null, (rooms) => {
        setParsedRooms(rooms);
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const selectHandler = useCallback(() => { }, []);

  const updateListOfRooms = ({ data }) => {
    setParsedRooms((oldRooms) => {
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
              `Action of ${action} isn't one of known actions for rooms [add/update/remove]`,
            );
        }
      });
      return newRooms;
    });
  };

  const removeRoomFromList = ({ roomId }) => {
    setParsedRooms((oldRooms) => {
      const newRooms = { ...oldRooms };
      delete newRooms[roomId];
      return newRooms;
    });
  };

  useEffect(() => {
    dispatch(socketActions.listener(`updateListOfRooms`, updateListOfRooms));
    dispatch(socketActions.listener(`addRoomToList`, updateListOfRooms));
    dispatch(socketActions.listener(`removeRoomFromList`, removeRoomFromList));
    return () => {
      dispatch(
        socketActions.removeListener(`updateListOfRooms`, updateListOfRooms),
      );
      dispatch(
        socketActions.removeListener(`addRoomToList`, updateListOfRooms),
      );
      dispatch(
        socketActions.removeListener(`removeRoomFromList`, removeRoomFromList),
      );
    };
  }, [dispatch]);

  const roomCards = parsedRooms
    ? Object.values(parsedRooms).map((room) => (
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
      <Styled.Separator>Browse rooms</Styled.Separator>
      {(!roomCards || roomCards.length === 0) && (
        <Styled.CardsPlaceholder>
          <p>Sadly there are no public rooms available</p>
          <p>But you can create one!</p>
        </Styled.CardsPlaceholder>
      )}
      {roomCards && <Styled.CardContainer>{roomCards}</Styled.CardContainer>}
      <Styled.AboutLink to="/credits">Credits</Styled.AboutLink>
    </>
  );
};

export default Browse;
