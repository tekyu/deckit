import React, { Component } from "react";
import * as styles from "./CreateGame.module.scss";
import { connect } from "react-redux";
import { listGameMapping, inputOnChangeHandler } from "utils";
import { listener, emitter } from "store/actions/socket";
import { CREATE_ROOM } from "store/actions/socketCreators";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class CreateGame extends Component {
  state = {
    isPublic: false, //TODO: change this
    players: 5,
    created: false
  };

  inputOnChangeHandler = inputOnChangeHandler.bind(this);

  componentDidMount() {
    this.props.listener(CREATE_ROOM, () => {
      this.setState({ created: true });
    });
  }

  submitCreateHandler = event => {
    const { isPublic, players, name, nickname, password } = this.state;
    const { emitter, listener } = this.props;
    const options = {
      isPublic,
      players,
      name,
      nickname,
      password
    };
    event.preventDefault();
    emitter(CREATE_ROOM, options);

    console.log("submitCreateHandler", options);
  };

  render() {
    const { isPublic } = this.state;
    const { user } = this.props;
    const anonNicknameInput = (
      <div className={styles.formGroup}>
        <label htmlFor="name">Your nickname</label>
        <input
          name="nickname"
          id="nickname"
          type="text"
          placeholder="Write it here!"
        />
      </div>
    );

    const mappedGameSelect = listGameMapping().map(game => (
      <option key={game} value={game}>
        {game}
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
          {user ? anonNicknameInput : null}
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
              name="game"
              id="game"
              type="text"
              placeholder="Select game"
              onChange={this.inputOnChangeHandler}
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
              name="players"
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

const mapDispatchToProps = { emitter, listener };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGame);
