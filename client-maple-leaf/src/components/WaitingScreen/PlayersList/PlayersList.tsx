import React from 'react';
import { useDispatch } from 'react-redux';
import { addSeat } from 'store/room/roomActions';
import { getGameMapping } from 'utils/gameMapping';
import Player from './Player/Player';
import EmptySeat from './EmptySeat/EmptySeat';
import AddSeat from './AddSeat/AddSeat';
import * as Styled from './PlayerList.styled';

// TODO: Make a new file - multiple files uses IPlayer and IRoom
interface IPlayer {
  anon: boolean;
  avatar: string;
  cards: string[];
  color: string;
  id: string;
  nickname: string;
  ranking: number;
  rooms: string[];
  score: number;
  socketId: string;
  state: number;
  username: string;
}

interface IRoom {
  admin: string;
  createdAt: number;
  gameCode: 'd' | 'k';
  id: string;
  mode: 'private' | 'public' | 'fast';
  name: string;
  owner: string;
  players: IPlayer[];
  playersMax: number;
  state: number;
  winners: string[],
}

interface IPlayersList {
  players: IPlayer[];
  room: IRoom;
  isAdmin: boolean;
  myId: string;
}
const PlayersList = ({
  players, room, isAdmin, myId,
}: IPlayersList): JSX.Element => {
  const dispatch = useDispatch();
  const addSeatHandler = () => {
    dispatch(addSeat(room.id));
  };
  const playerList = () => players.map(({
    id, state, anon, username, color, avatar,
  }) => (
    <Player
      key={id}
      id={id}
      state={state}
      username={username}
      color={color}
      isAdmin={room.admin === id}
      isAnon={anon}
      avatar={avatar}
      roomId={room.id}
      myId={myId}
      itsMe={id === myId}
      amIAdmin={room.admin === myId}
    />
  ));
  const waitingList = () => {
    const { allowedPlayers } = getGameMapping(room.gameCode);
    const players = playerList();
    const emptySeats = Array.from({
      length: room.playersMax - players.length,
      // eslint-disable-next-line react/no-array-index-key
    }).map((v, i) => <EmptySeat roomId={room.id} isAdmin={isAdmin} key={i} />);
    const waitingList = [...players, ...emptySeats];
    if (room.admin === myId && waitingList.length < allowedPlayers) {
      waitingList.push(<AddSeat key="addseat" handler={addSeatHandler} />);
    }
    return waitingList;
  };

  return <Styled.Container>{waitingList()}</Styled.Container>;
};

export default PlayersList;
