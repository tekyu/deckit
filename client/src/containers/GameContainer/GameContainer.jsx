import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
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
import SidePanel from "./SidePanel/SidePanel";
import { leaveRoom, updateActiveRoom } from "../../store/room/roomActions";
import WaitingScreen from "../../components/WaitingScreen/WaitingScreen";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px - 40px);
`;

const GameContainer = () => {
  const {
    params: { id }
  } = useRouteMatch();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const activeRoom = useSelector(selectActiveRoom);
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  const [panels, setPanels] = useState({});
  const getRoomInfo = useCallback(
    id => {
      dispatch(
        emitter(JOIN_ROOM, { roomId: id, userData }, roomData => {
          console.log("[GameContainer joinroom]", userData);
          dispatch(updateActiveRoom(roomData));
        })
      );
    },
    [dispatch, userData]
  );

  const updateActiveRoomHandler = useCallback(
    ({ data }) => {
      console.log("ROOM_UPDATED", data);
      dispatch(updateActiveRoom(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (activeRoom && activeRoom.state >= 2) {
      const { gameCode } = activeRoom;
      setGameComponent(getGame(gameCode));
      setPanels(gameMapping[gameCode].panels);
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

  // useEffect(() => {
  //   return () => {
  //     dispatch(setActiveRoom());
  //   };
  // }, [dispatch]);

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
        {activeRoom && activeRoom.state < 2 && <WaitingScreen />}
        {GameComponent && <GameComponent options={roomInfo} />}
        {activeRoom && activeRoom.state >= 2 && Object.keys(panels).length && (
          <SidePanel panels={panels} />
        )}
      </Suspense>
    </Container>
  );
};

export default GameContainer;
