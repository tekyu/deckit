import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { gameMapping, getGame } from "utils";
import {
  GET_ROOM_INFO,
  emitter,
  openModal,
  setActiveRoom
} from "store/actions";
import { withRouter } from "react-router-dom";

import SidePanel from "./SidePanel/SidePanel";
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

const GameContainer = ({
  user,
  emitter,
  match: {
    params: { id }
  },
  openModal,
  setActiveRoom
}) => {
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  const [panels, setPanels] = useState({});
  const getRoomInfo = useCallback(
    id => {
      emitter(GET_ROOM_INFO, { id }, roomData => {
        const { gameCode } = roomData;
        console.log(`[GameContainer][getRoomInfo]`, gameCode, roomData);
        setRoomInfo(roomData);
        setGameComponent(getGame(gameCode));
        setPanels(gameMapping[gameCode].panels);
      });
    },
    [emitter]
  );

  useEffect(() => {
    if (!user) {
      // return modal with username option
      openModal(`anonymous`);
    } else {
      emitter(`newConnectedPlayer`, user);
    }
    getRoomInfo(id);
    setActiveRoom(id);

    return () => {
      setActiveRoom();
    };
  });
  return (
    <Container>
      <Suspense fallback={<div>LOADING GAME</div>}>
        {GameComponent && <GameComponent options={roomInfo} />}
        {Object.keys(panels).length && <SidePanel panels={panels} />}
      </Suspense>
    </Container>
  );
};

const mapStateToProps = ({ auth, user: { user } }) => {
  return {
    auth,
    user
  };
};

const mapDispatchToProps = { emitter, openModal, setActiveRoom };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GameContainer));
