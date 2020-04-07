import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { gameMapping, getGame } from "utils";
import {
  JOIN_ROOM,
  emitter,
  listener,
  removeListener,
  openModal,
  setActiveRoom,
  setActiveRoomId
} from "store/actions";
import selectUser from "store/selectors/selectUser";
import { toast } from "react-toastify";
import { leaveRoom, updateActiveRoom } from "../../store/room/roomActions";
import WaitingScreen from "../../components/WaitingScreen/WaitingScreen";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import {
  updateMyCardsListener,
  removeUpdateMyCardsListener,
  updateGameOptionsListener
} from "../../store/deckit/deckitActions";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 70px - 40px);
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
  const userData = useSelector(selectUser);
  const activeRoom = useSelector(selectActiveRoom);
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  // const [panels, setPanels] = useState({});

  useEffect(() => {
    dispatch(updateMyCardsListener());
    dispatch(updateGameOptionsListener());
    return () => {
      dispatch(removeUpdateMyCardsListener());
    };
  }, []);

  const getRoomInfo = useCallback(
    id => {
      dispatch(
        emitter(JOIN_ROOM, { roomId: id, userData }, roomData => {
          if (roomData.error) {
            history.replace("/");
            toast.error(roomData.error, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }
          dispatch(updateActiveRoom(roomData));
        })
      );
    },
    [dispatch, userData]
  );

  const updateActiveRoomHandler = useCallback(
    ({ data }) => {
      dispatch(updateActiveRoom(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (activeRoom && activeRoom.state >= 2) {
      const { gameCode, id } = activeRoom;
      setGameComponent(getGame(gameCode, id));
      // setPanels(gameMapping[gameCode].panels);
    }
  }, [activeRoom]);

  useEffect(() => {
    if (activeRoom) {
      dispatch(listener(`ROOM_UPDATED`, updateActiveRoomHandler));
    }

    return () => {
      dispatch(removeListener(`ROOM_UPDATED`, updateActiveRoomHandler));
    };
  }, [dispatch, activeRoom, updateActiveRoomHandler]);

  useEffect(() => {
    dispatch(setActiveRoomId(id));
    return () => {
      dispatch(leaveRoom(id));
      dispatch(setActiveRoomId());
      dispatch(setActiveRoom());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!userData) {
      dispatch(openModal(`anonymous`));
    } else {
      getRoomInfo(id);
    }
  }, [getRoomInfo, id, userData, dispatch]);

  return (
    <Container>
      <Suspense fallback={<div>LOADING GAME</div>}>
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
