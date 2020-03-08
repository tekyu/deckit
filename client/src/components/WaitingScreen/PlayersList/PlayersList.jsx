import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addSeat } from "store/room/roomActions";
import { getGameMapping } from "../../../utils/gameMapping";
import Player from "./Player/Player";
import Icon from "../../Generic/Icon/Icon";
import Loader from "../../Generic/Loader/Loader";

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 10px;
`;

const PlayersList = ({ players, room, isAdmin, myId }) => {
  const dispatch = useDispatch();
  const addSeatHandler = () => {
    dispatch(addSeat(room.id));
  };
  const playerList = () => {
    return players.map(({ id, state, anon, username, color, avatar }) => {
      return (
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
      );
    });
  };
  const waitingList = () => {
    const { allowedPlayers } = getGameMapping(room.gameCode);
    const players = playerList();
    const emptySeats = Array.from({
      length: room.playersMax - players.length
    }).map((v, i) => {
      return (
        <div
          key={i}
          style={{
            margin: "0 10px 20px 10px"
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100px"
            }}
          >
            <Icon icon="user" size={100} />
          </div>
          {isAdmin && <button>Invite</button>}
        </div>
      );
    });
    const waitingList = [...players, ...emptySeats];
    if (room.admin === myId && waitingList.length < allowedPlayers) {
      const addPlayer = (
        <div
          key="addplayer"
          style={{
            margin: "0 10px 20px 10px"
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100px"
            }}
            onClick={addSeatHandler}
          >
            <Icon icon="plus" size={60} />
            Add seat
          </div>
        </div>
      );
      waitingList.push(addPlayer);
    }
    console.log(
      "WAITINGLIST",
      waitingList,
      Array.from({ length: room.playersMax - players.length })
    );
    return waitingList;
  };

  return <StyledContainer>{waitingList()}</StyledContainer>;
};

export default PlayersList;
