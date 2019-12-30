import React, { Suspense, useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { gameMapping, getGame } from "utils";
import { emitter, openModal, setRoom } from "store/actions";
import axios from "utils/axios";
import * as Styled from "./GameContainer.styled";

import SidePanel from "./SidePanel/SidePanel";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const GameContainer = ({
  match: {
    params: { id }
  },
  openModal,
  setRoom,
  userId
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
    if (!userId) {
      openModal(`anonymous`);
    } else {
      // emitter(`newConnectedPlayer`, user);
    }
    axios.get(`/rooms/${id}`).then(res => {
      const { room } = res.data;
      setRoom(room);
    });
  }, [id, openModal, setRoom, userId]);
  return (
    <Styled.Container>
      <Suspense fallback={<div>LOADING GAME</div>}>
        {GameComponent && <GameComponent options={roomInfo} />}
        {!!Object.keys(panels).length && <SidePanel panels={panels} />}
      </Suspense>
    </Styled.Container>
  );
};

GameContainer.propTypes = {
  openModal: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired })
  }),
  setRoom: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = ({ user: { userId } }) => {
  return {
    userId
  };
};

const mapDispatchToProps = { emitter, openModal, setRoom };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GameContainer));
