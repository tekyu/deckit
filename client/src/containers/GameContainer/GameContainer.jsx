import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getGame } from "utils";
import {
  appActions,
  deckitActions,
  roomActions,
  socketActions
} from "store/actions";
import { roomSelectors, userSelectors } from "store/selectors";
import { toast } from "react-toastify";
import WaitingScreen from "../../components/WaitingScreen/WaitingScreen";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 50px - 20px);
`;

const WaitingScreenContainer = styled.div`
  height: 100%;
  @media (max-width: 1100px) {
    height: auto;
  }
`;

const GameContainer = () => {
  const {
    params: { id }
  } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(userSelectors.user);
  const activeRoom = useSelector(roomSelectors.activeRoom);
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  // const [panels, setPanels] = useState({});

  useEffect(() => {
    dispatch(deckitActions.updateMyCardsListener());
    dispatch(deckitActions.updateGameOptionsListener());
    return () => {
      dispatch(deckitActions.removeUpdateMyCardsListener());
    };
  }, [dispatch]);

  const getRoomInfo = useCallback(
    id => {
      dispatch(
        socketActions.emitter(
          socketActions.JOIN_ROOM,
          { roomId: id, userData },
          roomData => {
            if (roomData.error) {
              history.replace(`/`);
              toast.error(roomData.error, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            }
            dispatch(roomActions.updateActiveRoom(roomData));
          }
        )
      );
    },
    [dispatch, history, userData]
  );

  const updateActiveRoomHandler = useCallback(
    ({ data }) => {
      dispatch(roomActions.updateActiveRoom(data));
    },
    [dispatch]
  );

  useEffect(() => {
    const pingInterval = setInterval(() => {
      dispatch(socketActions.emitter(`PING_ROOM`));
    }, 330000);
    return () => {
      clearInterval(pingInterval);
    };
  }, []);

  useEffect(() => {
    if (activeRoom && activeRoom.state >= 2) {
      const { gameCode, id } = activeRoom;
      setGameComponent(getGame(gameCode, id));
      // setPanels(gameMapping[gameCode].panels);
    }
  }, [activeRoom]);

  useEffect(() => {
    if (activeRoom) {
      dispatch(socketActions.listener(`ROOM_UPDATED`, updateActiveRoomHandler));
    }

    return () => {
      dispatch(
        socketActions.removeListener(`ROOM_UPDATED`, updateActiveRoomHandler)
      );
    };
  }, [dispatch, activeRoom, updateActiveRoomHandler]);

  useEffect(() => {
    dispatch(roomActions.setActiveRoomId(id));
    return () => {
      dispatch(roomActions.leaveRoom(id));
      dispatch(roomActions.setActiveRoomId());
      dispatch(roomActions.setActiveRoom());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!userData) {
      dispatch(appActions.openModal(`anonymous`));
    } else {
      getRoomInfo(id);
    }
  }, [getRoomInfo, id, userData, dispatch]);

  return (
    <Container>
      <Suspense fallback={<FullScreenLoader />}>
        {activeRoom && activeRoom.state < 2 && (
          <WaitingScreenContainer>
            <WaitingScreen />
          </WaitingScreenContainer>
        )}
        {GameComponent && <GameComponent options={roomInfo} />}
      </Suspense>
    </Container>
  );
};

export default GameContainer;
