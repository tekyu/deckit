import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import sillyname from "sillyname";
import { createRoom, updateAnonymousUsername } from "store/actions";
import {
  Button,
  Checkbox,
  RangeInput,
  Select,
  TextInput
} from "components/Generic";
import * as Styled from "./CreateGame.styled";

const CreateGame = ({ user }) => {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState(sillyname());
  const [username, setUsername] = useState(sillyname());
  const [password, setPassword] = useState(``);
  const [gameCode, setGameCode] = useState(`d`);
  const [isPrivate, setIsPrivate] = useState(false);
  const [playersMax, setPlayersMax] = useState(`4`);
  const submitHandler = useCallback(
    event => {
      event.preventDefault();
      const options = {
        gameCode,
        isPublic: !isPrivate,
        owner: user.userId,
        name: roomName,
        playersMax
      };
      if (!user.username) {
        dispatch(updateAnonymousUsername({ username }));
      }
      dispatch(createRoom(options));
    },
    [
      dispatch,
      gameCode,
      isPrivate,
      playersMax,
      roomName,
      user.userId,
      user.username,
      username
    ]
  );
  return (
    <Styled.Form onSubmit={submitHandler}>
      {!user.username && (
        <TextInput
          id="username"
          name="Username"
          onChange={setUsername}
          value={username}
        />
      )}
      <TextInput
        id="roomName"
        name="Room name"
        onChange={setRoomName}
        value={roomName}
      />
      <Select handler={setGameCode} options={[`d`]} selected="d" />
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

CreateGame.defaultProps = {
  user: null
};

CreateGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(withRouter(CreateGame));
