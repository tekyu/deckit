import React from "react";
import { useSelector } from "react-redux";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import selectUserId from "../../store/selectors/selectUserId";
import selectUser from "../../store/selectors/selectUser";
import { getGameMapping } from "../../utils/gameMapping";

const WaitingScreen = () => {
  const room = useSelector(selectActiveRoom);
  const myId = useSelector(selectUserId);
  const { state: myState } = useSelector(selectUser);
  const { name, playersMax, players, id, admin, gameCode, mode } = room;
  const isAdmin = myId === admin;
  const waitingList = () => {
    const { allowedPlayers } = getGameMapping[gameCode];
    const players = playerList();
    const emptySeats = Array.from(playersMax - players.length).map((v, i) => {
      return (
        <div key={i}>
          <span>Waiting</span>
          <div>
            <div>avatar</div>
          </div>
          <button>Invite</button>
        </div>
      );
    });
    const waitingList = [...players, ...emptySeats];
    if (waitingList.length < allowedPlayers) {
      const addPlayer = (
        <div>
          <div>
            <div>add icon</div>
          </div>
          <button>Add seat</button>
        </div>
      );
      waitingList.push(addPlayer);
    }
    return waitingList;
  };

  const playerList = () => {
    return players.map(({ id, state, anon, username, color }) => {
      return (
        <div key={id} id={id}>
          {id === admin && <span>ADMIN</span>}
          {state === 1 && <span>READY</span>}
          <div>
            {state && "r"}
            {isAdmin && <span>removePlayer</span>}
            <div>avatar {anon && "anon"}</div>
          </div>
          <h3>{username}</h3>
          {myId === id && <span>YOU</span>}
        </div>
      );
    });
  };
  return (
    <div id={id}>
      <div>
        <div>icon {mode}</div>
        <div>timer</div>
      </div>
      <h2>Welcome to {name}</h2>
      <div>{waitingList()}</div>
      <div>
        <h3>
          <button>{id}</button> is your room ID. Share it to friends or click on
          it to copy
        </h3>
        <label>
          <input type="checkbox" /> Hide this message
        </label>
      </div>
      <div>
        <h4>Options</h4>
        <label>
          <input type="checkbox" /> Make room
          {mode === "public" ? " private" : " public"}
        </label>
      </div>
      {isAdmin && <button>Start Game</button>}
      {!isAdmin && myState === 0 && <button>Ready</button>}
      {!isAdmin && myState === 1 && <button>Not ready</button>}
    </div>
  );
};

export default WaitingScreen;
