import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  closeSocket,
  emitMessage,
  openModal,
  openSocket,
  setRoom
} from "store/actions";
import axios from "utils/axios";
import * as Styled from "./GameContainer.styled";
import SidePanel from "./SidePanel/SidePanel";

const GameContainer = ({
  match: {
    params: { id }
  },
  closeSocket,
  emitMessage,
  isInitialized,
  openModal,
  openSocket,
  setRoom,
  userId,
  username
}) => {
  useEffect(() => {
    if (!userId) {
      openModal(`anonymous`);
    }
    axios.get(`/rooms/${id}`).then(res => {
      const { room } = res.data;
      openSocket();
      emitMessage(`playerJoinRoom`, { roomId: room.roomId, userId, username });
      setRoom(room);
    });
    return () => {
      closeSocket();
    };
  }, [
    closeSocket,
    emitMessage,
    id,
    openModal,
    openSocket,
    setRoom,
    userId,
    username
  ]);
  return isInitialized ? (
    <Styled.Container>
      {/* {GameComponent && <GameComponent />} */}
      <SidePanel />
    </Styled.Container>
  ) : null;
};

GameContainer.propTypes = {
  closeSocket: PropTypes.func.isRequired,
  emitMessage: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  openSocket: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired })
  }),
  setRoom: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = ({
  socket: { isInitialized },
  user: { userId, username }
}) => {
  return {
    isInitialized,
    userId,
    username
  };
};

const mapDispatchToProps = {
  closeSocket,
  emitMessage,
  openModal,
  openSocket,
  setRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GameContainer));
