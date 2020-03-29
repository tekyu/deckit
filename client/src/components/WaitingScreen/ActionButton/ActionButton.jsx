import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import selectUser from "../../../store/selectors/selectUser";
import selectActiveRoom from "../../../store/selectors/selectActiveRoom";
import { startGame, updatePlayerInRoom } from "../../../store/room/roomActions";

const StyledButton = styled(Button)`
  border: 0;
  background: #cb3066;
  border-radius: 3px;
  ${({ isReady }) =>
    isReady &&
    `
    background: transparent;
    background-image: linear-gradient(
    35deg,
    #2ac9db -10%, #009bff 47%,
    #cf77f3 130%
  );
    `}
  font-size: 14px;
  padding: 16px 32px;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease-out;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.28);
  &:focus,
  &:hover,
  &:active {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.28);
  }
`;

const ActionButton = () => {
  const { id: userId, state: userState } = useSelector(selectUser);
  const { id: activeRoomId, admin: adminId, players } = useSelector(
    selectActiveRoom
  );
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [playerState, setPlayerState] = useState(0);
  const startGameHandler = () => {
    dispatch(startGame({ activeRoomId }));
  };

  useEffect(() => {
    const { state: playerState = 0 } =
      players.filter(({ id }) => id === userId)[0] || [];
    setPlayerState(playerState);
  }, [players, userId]);

  const readyHandler = () => {
    // TODO: Change this to take state from user
    dispatch(
      updatePlayerInRoom({
        activeRoomId,
        playerId: userId,
        data: { state: playerState === 0 ? 1 : 0 }
      })
    );
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
      <StyledButton
        variant="contained"
        color="primary"
        isReady={hasNotReadyPlayers || players.length < 2 ? false : true}
        isdisabled={(hasNotReadyPlayers || players.length < 2).toString()}
        onClick={startGameHandler}
      >
        {getButtonText(players, hasNotReadyPlayers)}
      </StyledButton>
    );
  }
  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={readyHandler}
      isReady={playerState === 0}
    >
      {playerState === 0 ? `Ready` : `Not Ready`}
    </StyledButton>
  );
};

export default ActionButton;
