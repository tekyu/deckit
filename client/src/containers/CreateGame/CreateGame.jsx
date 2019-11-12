import React, { Component } from "react";
import * as styles from "./CreateGame.module.scss";
import { connect } from "react-redux";
import sillyname from "sillyname";
import { gameMapping, inputOnChangeHandler } from "utils";
import { listener, emitter } from "store/actions/socket";
import { updateAnonUser } from "store/actions/user";
import { CREATE_ROOM, UPDATE_ANON_USER } from "store/actions/socketCreators";
import { withRouter } from "react-router-dom";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class CreateGame extends Component {
  state = {
    isPublic: false, //TODO: change this
    playersMax: 5,
    gameCode: "d",
    username: sillyname(),
    password: "",
    created: false
  };

  inputOnChangeHandler = inputOnChangeHandler.bind(this);

  submitCreateHandler = event => {
    const { isPublic, playersMax, name, password, gameCode } = this.state;
    const { updateUser } = this.props;
    const options = {
      isPublic: !isPublic,
      playersMax: +playersMax,
      name,
      password,
      gameCode
    };
    event.preventDefault();
    emitter(CREATE_ROOM, options, data => {
      if (!data.error) {
        this.props.history.push(`/game/${data.roomId}`);
      }
      updateUser(data.roomId);
    });
  };

  updateUser = roomId => {
    const anonymous = true; //TODO: Change it to state management
    const { username } = this.state;
    const { emitter, updateAnonUser } = this.props;
    if (anonymous) {
      emitter(UPDATE_ANON_USER, { username, roomId }, userData => {
        updateAnonUser(userData);
      });
    }
  };

  render() {
    const { isPublic } = this.state;
    const { user } = this.props;
    const anonusernameInput = (
      <div className={styles.formGroup}>
        <label htmlFor="name">Your username</label>
        <input
          name="username"
          id="username"
          type="text"
          placeholder="Write it here!"
          onChange={this.inputOnChangeHandler}
          value={this.state.username}
        />
      </div>
    );

    const mappedGameSelect = Object.keys(gameMapping).map(gameCode => (
      <option key={gameCode} value={gameCode}>
        {gameMapping[gameCode].name}
      </option>
    ));

    const passwordInput = (
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="text"
          placeholder="Write it here!"
          onChange={this.inputOnChangeHandler}
        />
      </div>
    );

    return (
      <div className={styles.container}>
        <form onSubmit={this.submitCreateHandler} className={styles.form}>
          <label className={styles.header}>
            Create room {this.state.created ? "true" : "false"}
          </label>
          {user ? anonusernameInput : null}
          <div className={styles.formGroup}>
            <label htmlFor="name">Name of the room</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Write it here!"
              onChange={this.inputOnChangeHandler}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="players">Game</label>
            <select
              name="gameCode"
              id="game"
              type="text"
              placeholder="Select game"
              onChange={this.inputOnChangeHandler}
              value={this.state.game}
            >
              {mappedGameSelect}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="isPublic">Private room?</label>
            <input
              name="isPublic"
              id="isPublic"
              type="checkbox"
              placeholder="Write it here!"
              onChange={this.inputOnChangeHandler}
            />
          </div>
          {!isPublic ? null : passwordInput}
          <div className={styles.formGroup}>
            <label htmlFor="players">Number of players</label>
            <input
              name="playersMax"
              id="players"
              type="range"
              min="2"
              max="10" //TODO: get json with all of the specs from the request on site visit
              value={this.state.players}
              placeholder="Write it here!"
              onChange={this.inputOnChangeHandler}
            />
          </div>
          <button type="submit">Create game</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }, store) => {
  return {
    store,
    auth,
    user
  };
};

const mapDispatchToProps = { emitter, listener, updateAnonUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
