import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { gameMapping, getGame } from "utils";
import {
  JOIN_ROOM,
  emitter,
  openModal,
  setActiveRoom,
  setActiveRoomId
} from "store/actions";
import { withRouter } from "react-router-dom";
import selectUserForRoom from "store/selectors/selectUserForRoom";
import selectUser from "store/selectors/selectUser";
import selectActiveRoomId from "store/selectors/selectActiveRoomId";
import SidePanel from "./SidePanel/SidePanel";
import { leaveRoom } from "../../store/room/roomActions";
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
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  const [panels, setPanels] = useState({});
  const getRoomInfo = useCallback(
    id => {
      dispatch(
        emitter(JOIN_ROOM, { roomId: id, userData }, roomData => {
          const { gameCode } = roomData;
          console.log("[GameContainer joinroom]", userData);
          setRoomInfo(roomData);
          setGameComponent(getGame(gameCode));
          setPanels(gameMapping[gameCode].panels);
        })
      );
    },
    [dispatch, userData]
  );

  useEffect(() => {
    dispatch(setActiveRoomId(id));
    return () => {
      dispatch(leaveRoom(id));
      dispatch(setActiveRoomId());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setActiveRoom(roomInfo));
    return () => {
      dispatch(setActiveRoom());
    };
  }, [dispatch, roomInfo]);

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
        {GameComponent && <GameComponent options={roomInfo} />}
        {Object.keys(panels).length && <SidePanel panels={panels} />}
      </Suspense>
    </Container>
  );
};

export default GameContainer;
