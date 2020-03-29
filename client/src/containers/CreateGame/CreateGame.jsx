import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import sillyname from "sillyname";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import {
  emitter,
  CREATE_ROOM,
  UPDATE_ANON_USER,
  updatedUser
} from "store/actions";
import selectUser from "store/selectors/selectUser";
import { gameMapping } from "utils";
import * as Styled from "./CreateGame.styled";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const getOptions = () =>
  Object.keys(gameMapping).map(gameCode => (
    <option key={gameCode} value={gameCode}>
      {gameMapping[gameCode].name}
    </option>
  ));

const validate = ({ isPrivate, username, name }) => {
  const errors = {};
  if (!username.trim()) {
    errors.username = `You need to specify your name or login in order to create game`;
  }
  if (!name.trim()) {
    errors.name = `Game name cannot be empty`;
  }
  return errors;
};

const CreateGame = () => {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const updateUser = username => {
    return new Promise((resolve, reject) => {
      dispatch(
        emitter(UPDATE_ANON_USER, { username }, userData => {
          dispatch(updatedUser(userData));
          resolve(userData);
        })
      );
    });
  };

  const createRoom = (roomOptions, id) => {
    dispatch(
      emitter(CREATE_ROOM, { roomOptions, id }, ({ error, roomId }) => {
        if (!error) {
          history.push(`/game/${roomId}`);
        }
      })
    );
  };
  const submitCreateGameHandler = ({
    isPrivate,
    playersMax,
    name,
    password,
    gameCode,
    username
  }) => {
    const roomOptions = {
      mode: isPrivate ? `private` : `public`,
      playersMax: +playersMax,
      name,
      password,
      gameCode,
      username
    };
    if (userData) {
      createRoom(roomOptions, userData.id);
    } else {
      updateUser(username).then(({ id }) => {
        createRoom(roomOptions, id);
      });
    }
  };
  return (
    <Formik
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        gameCode: `d`,
        name: sillyname(),
        playersMax: 10,
        isPrivate: true,
        username: sillyname()
      }}
      onSubmit={(values, { setSubmitting }) => {
        submitCreateGameHandler(values);
        setSubmitting(false);
      }}
    >
      {({
        isSubmitting,
        values: { username, name, playersMax, isPrivate },
        handleChange,
        handleBlur,
        setFieldValue
      }) => {
        return (
          <Styled.CreateForm>
            <Styled.Header>Create new game</Styled.Header>
            {!userData && (
              <>
                <Styled.TextField
                  label="Your nickname"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={username}
                />
                <Typography color="error">
                  <ErrorMessage name="username" />
                </Typography>
              </>
            )}
            <>
              <Styled.TextField
                label="Room name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={name}
              />
              <Typography color="error">
                <ErrorMessage name="name" />
              </Typography>
            </>
            <Styled.SliderLabel htmlFor="playersMax">
              Maximum players in room
              <Styled.Slider
                name="playersMax"
                defaultValue={4}
                min={2}
                max={10}
                step={1}
                valueLabelDisplay="on"
                onChange={(event, value) => {
                  return setFieldValue(`playersMax`, value);
                }}
              />
            </Styled.SliderLabel>
            <Styled.ControlLabel
              label="Private game"
              control={
                <Checkbox
                  color="primary"
                  checked={isPrivate}
                  name="isPrivate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              }
            />
            <Styled.CreateButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </Styled.CreateButton>
          </Styled.CreateForm>
        );
      }}
    </Formik>
  );
};

export default CreateGame;
