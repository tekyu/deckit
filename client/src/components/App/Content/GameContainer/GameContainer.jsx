import React, { Suspense, useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { gameMapping, getGame } from "utils";
import { emitter, openModal, setActiveRoom } from "store/actions";
import axios from "utils/axios";
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
  },
  openModal,
  setActiveRoom
}) => {
  const [roomInfo, setRoomInfo] = useState(null);
  const [GameComponent, setGameComponent] = useState(null);
  const [panels, setPanels] = useState({});
  // const getRoomInfo = useCallback(id => eh {
  //   emitter(GET_ROOM_INFO, { id }, roomData => {
  //     const { gameCode } = roomData;
  //     console.log(`[GameContainer][getRoomInfo]`, gameCode, roomData);
  //     setRoomInfo(roomData);
  //     setGameComponent(getGame(gameCode));
  //     setPanels(gameMapping[gameCode].panels);
  //   });
  // }, []);
  useEffect(() => {
    if (!user.userId) {
      openModal(`anonymous`);
    } else {
      // emitter(`newConnectedPlayer`, user);
    }
    axios.get(`/rooms/${id}`).then(res => {
      const { room } = res.data;
      setActiveRoom(room);
    });
  }, [id, openModal, setActiveRoom, user]);
  return (
    <Styled.Container>
      <Suspense fallback={<div>LOADING GAME</div>}>
        {GameComponent && <GameComponent options={roomInfo} />}
        {!!Object.keys(panels).length && <SidePanel panels={panels} />}
      </Suspense>
    </Styled.Container>
  );
};

const mapStateToProps = ({ auth, user }) => {
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
