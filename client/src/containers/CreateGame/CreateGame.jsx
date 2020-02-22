import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { gameMapping } from "utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  emitter,
  CREATE_ROOM,
  UPDATE_ANON_USER,
  updatedUser
} from "store/actions";
import selectUser from "store/selectors/selectUser";
import sillyname from "sillyname";
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

const validate = ({ isPrivate, password, username }) => {
  console.log("validate", username);
  const errors = {};
  if (isPrivate && !password.trim()) {
    errors.password = "Password cannot be empty when private room selected";
  }
  if (!username.trim()) {
    errors.username =
      "You need to specify your name or login in order to create game";
  }
  return errors;
};

const CreateGame = () => {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const updateUser = username => {
    console.log("updateUser", username);
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
      mode: isPrivate ? "private" : "public",
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
      initialValues={{
        gameCode: "d",
        name: sillyname(),
        playersMax: 6,
        isPrivate: true,
        password: "",
        username: sillyname()
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("values", values.username);
        submitCreateGameHandler(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values: { isPrivate } }) => {
        return (
          <Form>
            {!userData && (
              <label htmlFor="username">
                Your nickname
                <React.Fragment>
                  <Field name="username" />
                  <ErrorMessage name="username" />
                </React.Fragment>
              </label>
            )}

            <label htmlFor="name">
              Room name <Field name="name" />
            </label>
            <label htmlFor="gameCode">
              Game
              <Field as="select" name="gameCode">
                {getOptions()}
              </Field>
            </label>
            <label htmlFor="playersMax">
              Maximum players in room
              <Field type="range" name="playersMax" min="2" max="10" />
            </label>
            <label htmlFor="isPrivate">
              Private <Field type="checkbox" name="isPrivate" />
            </label>
            {isPrivate && (
              <label htmlFor="password">
                Password for your room
                <React.Fragment>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password" />
                </React.Fragment>
              </label>
            )}

            <button type="submit" disabled={isSubmitting}>
              Create room
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateGame;
