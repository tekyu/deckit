import React, { Suspense, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { gameMapping, getGame } from "utils";
import {
  GET_ROOM_INFO,
  emitter,
  openModal,
  setActiveRoom
} from "store/actions";
import { withRouter } from "react-router-dom";
import * as Styled from "./GameContainer.styled";

import SidePanel from "./SidePanel/SidePanel";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const GameContainer = ({
  user,
  match: {
    params: { id }
  }
}) => {
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  const [panels, setPanels] = useState({});
  const getRoomInfo = useCallback(id => {
    emitter(GET_ROOM_INFO, { id }, roomData => {
      const { gameCode } = roomData;
      console.log(`[GameContainer][getRoomInfo]`, gameCode, roomData);
      setRoomInfo(roomData);
      setGameComponent(getGame(gameCode));
      setPanels(gameMapping[gameCode].panels);
    });
  }, []);

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
    <Styled.Container>
      <Suspense fallback={<div>LOADING GAME</div>}>
        {GameComponent && <GameComponent options={roomInfo} />}
        {!!Object.keys(panels).length && <SidePanel panels={panels} />}
      </Suspense>
    </Styled.Container>
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
