import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketActions } from 'store/actions';
import { selectAuth } from 'store/user/userSelectors';
import RoomCard from './RoomCard/RoomCard';
import RoomJoining from './RoomJoining/RoomJoining';
import * as Styled from './Browse.styled';

const Browse = () => {
  const [parsedRooms, setParsedRooms] = useState([]);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const refreshList = useCallback(() => {
    dispatch(
      // TODO: REFACTOR THIS ON BACKEND, SENDING TOO MUCH INFO
      // CREATE A FUNCTION WHICH RETURNS ROOM OBJECT THAT
      // SHOULD BE VISIBLE FOR PUBLIC EYES
      // WITHOUT BACKEND SPECIFIC PROPS
      socketActions.emitter('getRooms', null, (rooms) => {
        console.log('getRooms', rooms);
        setParsedRooms(rooms);
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const updateListOfRooms = ({ data }) => {
    console.log('updateListOfRooms', data);
    setParsedRooms((oldRooms) => {
      console.log('setParsedRooms', oldRooms);
      const newRooms = { ...oldRooms };
      data.forEach(({ id, action, room }) => {
        console.log('data.forEach', id, action, room);
        switch (action) {
          case 'add':
            newRooms[id] = room;
            break;
          case 'remove':
            delete newRooms[id];
            break;
          case 'update':
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
    dispatch(socketActions.listener('updateListOfRooms', updateListOfRooms));
    dispatch(socketActions.listener('addRoomToList', updateListOfRooms));
    dispatch(socketActions.listener('removeRoomFromList', removeRoomFromList));
    return () => {
      dispatch(
        socketActions.removeListener('updateListOfRooms', updateListOfRooms),
      );
      dispatch(
        socketActions.removeListener('addRoomToList', updateListOfRooms),
      );
      dispatch(
        socketActions.removeListener('removeRoomFromList', removeRoomFromList),
      );
    };
  }, [dispatch]);
  console.log('roomCards', Object.values(parsedRooms));
  const roomCards = parsedRooms
    ? Object.values(parsedRooms).map(({
      id, name, createdBy, playersMax, mode, gameCode, players,
    }) => (
      <RoomCard
        key={id}
        id={id}
        name={name}
        createdBy={createdBy}
        playersMax={playersMax}
        mode={mode}
        gameCode={gameCode}
        players={players}
        isAnonymous={!auth}
      />
    ))
    : null;

  return (
    <>
      <RoomJoining />
      {
        roomCards && roomCards.length > 0 && (
          <Styled.Separator>Browse rooms</Styled.Separator>
        )
      }
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
