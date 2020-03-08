import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import selectUser from "../../../store/selectors/selectUser";
import selectActiveRoom from "../../../store/selectors/selectActiveRoom";
import { startGame, updatePlayerInRoom } from "../../../store/room/roomActions";
const ActionButton = () => {
  const { id: userId, state: userState } = useSelector(selectUser);
  const { id: activeRoomId, admin: adminId, players } = useSelector(
    selectActiveRoom
  );
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [playerState, setPlayerState] = useState(0);
  const startGameHandler = () => {
    console.log(`STARTGAME`);
    dispatch(startGame({ activeRoomId }));
  };

  useEffect(() => {
    const { state: playerState = 0 } =
      players.filter(({ id }) => id === userId)[0] || [];
    setPlayerState(playerState);
  }, [players, userId]);

  const readyHandler = () => {
    // TODO: Change this to take state from user
    console.log("readyHandler");
    dispatch(
      updatePlayerInRoom({
        activeRoomId,
        playerId: userId,
        data: { state: playerState === 0 ? 1 : 0 }
      })
    );
    // const newUser = {
    //   ...user,
    //   state: user.state === 0 ? 1 : 0
    // };
    // dispatch(updatedUser(newUser));
  };

  const getButtonText = (players, hasNotReadyPlayers) => {
    if (players.length < 2) {
      return `Not enough players`;
    }
    if (hasNotReadyPlayers) {
      return `Player's not ready`;
    }
    return `Start game`;
  };

  useEffect(() => {
    setIsAdmin(userId === adminId);
  }, [adminId, userId]);
  if (isAdmin) {
    const hasNotReadyPlayers = players.filter(({ state }) => state === 0)
      .length;
    return (
      <button
        isDisabled={hasNotReadyPlayers || players.length < 2}
        onClick={startGameHandler}
      >
        {getButtonText(players, hasNotReadyPlayers)}
      </button>
    );
  }
  return (
    <button onClick={readyHandler}>
      {playerState === 0 ? `Ready` : `Not Ready`}
    </button>
  );
};

export default ActionButton;
