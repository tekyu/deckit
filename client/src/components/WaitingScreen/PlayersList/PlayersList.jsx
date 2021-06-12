import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addSeat } from "store/room/roomActions";
import { getGameMapping } from "utils/gameMapping";
import Player from "./Player/Player";
import EmptySeat from "./EmptySeat/EmptySeat";
import AddSeat from "./AddSeat/AddSeat";
import * as Styled from './PlayerList.styled';

const PlayersList = ({
  players, room, isAdmin, myId,
}) => {
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
      isOwner={id === room.owner}
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

PlayersList.defaultProps = {
  players: [],
  room: {
    admin: ``,
    createdAt: Date.now(),
    gameCode: `d`,
    id: `Default Id`,
    mode: `private`,
    name: `Default Name`,
    owner: ``,
    players: {
      anon: true,
      avatar: null,
      cards: [],
      color: `#FF0000`,
      id: ``,
      nickname: `Default Name`,
      ranking: 1200,
      rooms: [],
      score: 0,
      socketId: ``,
      state: 1,
      username: `Default Name`,
    },
    playersMax: 24,
    state: 0,
    winners: [],
  },
  isAdmin: false,
  myId: ``,
};

PlayersList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    anon: PropTypes.bool,
    avatar: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    id: PropTypes.string,
    nickname: PropTypes.string,
    ranking: PropTypes.number,
    rooms: PropTypes.arrayOf(PropTypes.string),
    score: PropTypes.number,
    socketId: PropTypes.string,
    state: PropTypes.number,
    username: PropTypes.string,
  })),
  room: PropTypes.shape({
    admin: PropTypes.string,
    createdAt: PropTypes.number,
    gameCode: PropTypes.oneOf([`d`, `k`]),
    id: PropTypes.string,
    mode: PropTypes.oneOf([`private`, `public`, `fast`]),
    name: PropTypes.string,
    owner: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
      anon: PropTypes.bool,
      avatar: PropTypes.string,
      cards: PropTypes.arrayOf(PropTypes.string),
      color: PropTypes.string,
      id: PropTypes.string,
      nickname: PropTypes.string,
      ranking: PropTypes.number,
      rooms: PropTypes.arrayOf(PropTypes.string),
      score: PropTypes.number,
      socketId: PropTypes.string,
      state: PropTypes.number,
      username: PropTypes.string,
    })),
    playersMax: PropTypes.number,
    state: PropTypes.number,
    winners: PropTypes.arrayOf(PropTypes.string),
  }),
  isAdmin: PropTypes.bool,
  myId: PropTypes.string,
};

export default PlayersList;
