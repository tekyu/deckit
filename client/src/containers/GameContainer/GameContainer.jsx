import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import sillyname from "sillyname";
import { gameMapping, inputOnChangeHandler, getGame } from "utils";
import { listener, emitter } from "store/actions/socket";
import { CREATE_ROOM, GET_ROOM_INFO } from "store/actions/socketCreators";
import { withRouter } from "react-router-dom";
import { openModal } from "store/actions/modals";
import SidePanel from "./SidePanel/SidePanel";
import * as styles from "./GameContainer.module.scss";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class GameContainer extends Component {
  //TODO: Rename this to RoomContainer
  state = {
    roomInfo: null,
    GameComponent: null,
    panels: []
  };

  componentDidMount() {
    const { user, openModal } = this.props;
    if (!user) {
      // return modal with username option
      openModal("anonymous");
    } else {
      emitter("newConnectedPlayer", user);
    }
    this.getRoomInfo();
  }

  getRoomInfo = () => {
    const { emitter } = this.props;
    emitter(GET_ROOM_INFO, { id: this.props.match.params.id }, roomData => {
      this.setState({
        roomInfo: roomData,
        GameComponent: getGame(roomData.gameCode),
        panels: gameMapping[roomData.gameCode].panels
      });
    });
  };

  render() {
    const { GameComponent, roomInfo, panels } = this.state;
    return (
      <div className={styles.container}>
        <Suspense fallback={<div>LOADING GAME</div>}>
          {GameComponent && <GameComponent options={roomInfo} />}
          {panels.length && (
            <SidePanel roomId={this.props.match.params.id} panels={panels} />
          )}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user: { user } }, state) => {
  return {
    auth,
    user,
    state
  };
};

const mapDispatchToProps = { emitter, listener, openModal };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GameContainer));
