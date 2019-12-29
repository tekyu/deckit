import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import sillyname from "sillyname";
import {
  listener,
  emitter,
  updateAnonUser,
  CREATE_ROOM,
  UPDATE_ANON_USER
} from "store/actions";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, RangeInput, TextInput } from "components/Generic";
import * as Styled from "./CreateGame.styled";

const CreateGame = ({ updateUser, user }) => {
  const [roomName, setRoomName] = useState(sillyname());
  const [password, setPassword] = useState(``);
  const [gameCode, setGameCode] = useState(`d`);
  const [isPrivate, setIsPrivate] = useState(false);
  const [playersMax, setPlayersMax] = useState(4);
  const submitHandler = useCallback(
    event => {
      const options = {
        isPublic: !isPrivate,
        playersMax,
        name: roomName,
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
    },
    [gameCode, isPrivate, password, playersMax, roomName, updateUser]
  );
  return (
    <Styled.Form>
      <TextInput
        id="roomName"
        name="Room name"
        onChange={setRoomName}
        value={roomName}
      />
      <RangeInput
        id="playersMax"
        min={3}
        max={10}
        name="Max players"
        onChange={setPlayersMax}
        type="password"
        value={playersMax}
      />
      <Checkbox
        id="isPublic"
        name="Private"
        onChange={setIsPrivate}
        value={isPrivate}
      />
      <TextInput
        disabled={!isPrivate}
        id="password"
        name="Password"
        onChange={setPassword}
        type="password"
        value={password}
      />
      <Button preset="primary" type="submit">
        Create
      </Button>
    </Styled.Form>
  );
};

//   updateUser = roomId => {
//     const anonymous = true; // TODO: Change it to state management
//     const { username } = this.state;
//     const { emitter, updateAnonUser } = this.props;
//     if (anonymous) {
//       emitter(UPDATE_ANON_USER, { username, roomId }, userData => {
//         updateAnonUser(userData);
//         emitter(`newConnectedPlayer`, userData);
//       });
//     }
//   };

//   render() {
//     const { isPublic } = this.state;
//     const { user } = this.props;
//     const anonusernameInput = (
//       <div className={styles.formGroup}>
//         <label htmlFor="name">Your username</label>
//         <input
//           name="username"
//           id="username"
//           type="text"
//           placeholder="Write it here!"
//           onChange={this.inputOnChangeHandler}
//           value={this.state.username}
//         />
//       </div>
//     );

//     const mappedGameSelect = Object.keys(gameMapping).map(gameCode => (
//       <option key={gameCode} value={gameCode}>
//         {gameMapping[gameCode].name}
//       </option>
//     ));

//     const passwordInput = (
//       <div className={styles.formGroup}>
//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           id="password"
//           type="text"
//           placeholder="Write it here!"
//           onChange={this.inputOnChangeHandler}
//         />
//       </div>
//     );

//     return (
//       <div className={styles.container}>
//         <form onSubmit={this.submitCreateHandler} className={styles.form}>
//           <label className={styles.header}>
//             Create room {this.state.created ? `true` : `false`}
//           </label>
//           {user ? anonusernameInput : null}
//           <div className={styles.formGroup}>
//             <label htmlFor="name">Name of the room</label>
//             <input
//               name="name"
//               id="name"
//               type="text"
//               placeholder="Write it here!"
//               onChange={this.inputOnChangeHandler}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="players">Game</label>
//             <select
//               name="gameCode"
//               id="game"
//               type="text"
//               placeholder="Select game"
//               onChange={this.inputOnChangeHandler}
//               value={this.state.game}
//             >
//               {mappedGameSelect}
//             </select>
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="isPublic">Private room?</label>
//             <input
//               name="isPublic"
//               id="isPublic"
//               type="checkbox"
//               placeholder="Write it here!"
//               onChange={this.inputOnChangeHandler}
//             />
//           </div>
//           {!isPublic ? null : passwordInput}
//           <div className={styles.formGroup}>
//             <label htmlFor="players">Number of players</label>
//             <input
//               name="playersMax"
//               id="players"
//               type="range"
//               min="2"
//               max="10" // TODO: get json with all of the specs from the request on site visit
//               value={this.state.players}
//               placeholder="Write it here!"
//               onChange={this.inputOnChangeHandler}
//             />
//           </div>
//           <button type="submit">Create game</button>
//         </form>
//       </div>
//     );
//   }
// }

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};

const mapDispatchToProps = { emitter, listener, updateAnonUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
