import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import sillyname from "sillyname";
import { updateUser } from "store/actions";
import axios from "utils/axios";
import {
  Button,
  Checkbox,
  RangeInput,
  Select,
  TextInput
} from "components/Generic";
import * as Styled from "./CreateGame.styled";

const CreateGame = ({ history, user }) => {
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
        name: roomName,
        playersMax
      };
      axios.post(`/rooms`, { ...options }).then(res => {
        const { owner, roomId } = res.data;
        if (!user) {
          updateUser({
            userId: owner,
            username
          });
        }
        history.push(`/game/${roomId}`);
      });
    },
    [gameCode, history, isPrivate, playersMax, roomName, user, username]
  );
  return (
    <Styled.Form onSubmit={submitHandler}>
      {!user && (
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

const mapStateToProps = ({ user: { user } }) => {
  return {
    user
  };
};

const mapDispatchToProps = { updateUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGame));
