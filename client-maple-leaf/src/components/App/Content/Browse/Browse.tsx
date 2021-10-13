import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { socketActions } from 'store/actions';
import { cloneDeep } from 'lodash';
import RoomCard from './RoomCard/RoomCard';
import RoomJoining from './RoomJoining/RoomJoining';
import * as Styled from './Browse.styled';

interface IGameOptions {
  hint: string;
  hintCard: any;
  hinter: any;
  initialCards: any[];
  maxScore: number;
  pickedCardsToHint: any[];
  playersChoosedCard: any[];
  playersPickedCard: any[];
  remainingCards: any[];
}

interface IRoom {
  admin: string;
  chat: any[];
  createdAt: number;
  gameCode: string;
  gameOptions: IGameOptions;
  id: string;
  mode: string;
  name: string;
  owner: string;
  players: any;
  playersMax: number;
  scoreboard: any;
  state: number;
  winners: string[];
}

interface IUpdateRoom {
  id: string;
  room: IRoom;
  action: string;
}

const Browse = (): JSX.Element => {
  const [parsedRooms, setParsedRooms] = useState<{ [key: string]: IRoom }>({});
  const dispatch = useDispatch();
  const refreshList = useCallback(() => {
    dispatch(
      socketActions.emitter('getRooms', null, (rooms: { [key: string]: IRoom }) => {
        setParsedRooms(rooms);
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const updateListOfRooms = ({ data }: { data: IUpdateRoom[] }) => {
    setParsedRooms((oldRooms) => {
      const newRooms = cloneDeep(oldRooms);

      data.forEach(({ id, action, room }) => {
        switch (action) {
          case 'add':

            newRooms[id] = room;
            break;
          case 'remove':
            delete newRooms[id];
            break;
          case 'update':
            newRooms[id] = cloneDeep(room);
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

  const removeRoomFromList = ({ roomId }: { roomId: string }) => {
    setParsedRooms((oldRooms) => {
      const newRooms = cloneDeep(oldRooms);
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
  const roomCards = parsedRooms
    ? Object.values(parsedRooms).map(({
      id, name, owner, playersMax, mode, gameCode, players,
    }) => (
      <RoomCard
        key={id}
        id={id}
        name={name}
        createdBy={players.find(({ id }: { id: string }) => id === owner)?.username}
        playersMax={playersMax}
        mode={mode}
        gameCode={gameCode}
        players={players}
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
