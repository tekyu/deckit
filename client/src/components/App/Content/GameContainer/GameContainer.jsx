import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closeSocket, openModal, openSocket, setRoom } from "store/actions";
import axios from "utils/axios";
import * as Styled from "./GameContainer.styled";
import SidePanel from "./SidePanel/SidePanel";

const GameContainer = ({
  match: {
    params: { id }
  },
  closeSocket,
  openModal,
  openSocket,
  setRoom,
  userId
}) => {
  useEffect(() => {
    if (!userId) {
      openModal(`anonymous`);
    }
    axios.get(`/rooms/${id}`).then(res => {
      const { room } = res.data;
      openSocket();
      setRoom(room);
    });
    return () => {
      closeSocket();
    };
  }, [closeSocket, id, openModal, openSocket, setRoom, userId]);
  return (
    <Styled.Container>
      {/* {GameComponent && <GameComponent />} */}
      <SidePanel />
    </Styled.Container>
  );
};

GameContainer.propTypes = {
  closeSocket: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openSocket: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  closeSocket,
  openModal,
  openSocket,
  setRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GameContainer));
