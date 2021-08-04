import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { roomActions } from 'store/actions';
import { roomSelectors, userSelectors } from 'store/selectors';
import * as Styled from './ActionButton.styled';

const ActionButton = () => {
  const { id: userId } = useSelector(userSelectors.user);
  const { id: activeRoomId, admin: adminId, players } = useSelector(
    roomSelectors.activeRoom,
  );
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [playerState, setPlayerState] = useState(0);
  const startGameHandler = () => {
    dispatch(roomActions.startGame({ activeRoomId }));
  };

  useEffect(() => {
    const { state: playerState = 0 } = players.filter(({ id }) => id === userId)[0] || [];
    setPlayerState(playerState);
  }, [players, userId]);

  const readyHandler = () => {
    // TODO: Change this to take state from user
    dispatch(
      roomActions.updatePlayerInRoom({
        activeRoomId,
        playerId: userId,
        data: { state: playerState === 0 ? 1 : 0 },
      }),
    );
  };

  const getButtonText = (players, hasNotReadyPlayers) => {
    if (players.length < 2) {
      return 'Not enough players';
    }
    if (hasNotReadyPlayers) {
      return 'Player\'s not ready';
    }
    return 'Start game';
  };

  useEffect(() => {
    setIsAdmin(userId === adminId);
  }, [adminId, userId]);
  if (isAdmin) {
    const hasNotReadyPlayers = players.filter(({ state }) => state === 0)
      .length;
    return (
      <Styled.ActionButton
        variant="contained"
        color="primary"
        isPlayerReady={!(hasNotReadyPlayers || players.length < 2)}
        isdisabled={(hasNotReadyPlayers || players.length < 2).toString()}
        onClick={startGameHandler}
      >
        {getButtonText(players, hasNotReadyPlayers)}
      </Styled.ActionButton>
    );
  }
  return (
    <Styled.ActionButton
      variant="contained"
      color="primary"
      onClick={readyHandler}
      isPlayerReady={playerState === 0}
    >
      {playerState === 0 ? 'Ready' : 'Not Ready'}
    </Styled.ActionButton>
  );
};

export default ActionButton;
