import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import sillyname from "sillyname";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { roomActions, socketActions, userActions } from "store/actions";
import { userSelectors } from "store/selectors";
import * as Styled from "./CreateGame.styled";

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const validate = ({ username, name }) => {
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
  const userData = useSelector(userSelectors.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const createRoom = (roomOptions, id) => {
    dispatch(
      socketActions.emitter(
        roomActions.CREATE_ROOM,
        { roomOptions, id },
        ({ error, roomId }) => {
          if (!error) {
            history.push(`/game/${roomId}`);
          }
        },
      ),
    );
  };
  const submitCreateGameHandler = ({
    isPrivate,
    playersMax,
    name,
    maxScore,
    password,
    gameCode,
    username,
  }) => {
    const roomOptions = {
      mode: isPrivate ? `private` : `public`,
      playersMax: +playersMax,
      name,
      password,
      gameCode,
      username,
      gameOptions: { maxScore: +maxScore },
    };
    if (userData) {
      createRoom(roomOptions, userData.id);
    } else {
      dispatch(
        userActions.updatedUser(username, ({ id }) => createRoom(roomOptions, id)),
      );
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
        maxScore: 30,
        playersMax: 4,
        isPrivate: true,
        username: sillyname(),
      }}
      onSubmit={(values, { setSubmitting }) => {
        submitCreateGameHandler(values);
        setSubmitting(false);
      }}
    >
      {({
        isSubmitting,
        values: { username, name, isPrivate },
        handleChange,
        handleBlur,
        setFieldValue,
        initialValues: { playersMax, maxScore },
      }) => (
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
              defaultValue={playersMax}
              min={2}
              max={10}
              step={1}
              valueLabelDisplay="on"
              onChange={(event, value) => setFieldValue(`playersMax`, value)}
            />
          </Styled.SliderLabel>
          <Styled.SliderLabel htmlFor="maxScore">
            Maximum points
            <Styled.Slider
              name="maxScore"
              defaultValue={maxScore}
              min={8}
              max={60}
              step={1}
              valueLabelDisplay="on"
              onChange={(event, value) => setFieldValue(`maxScore`, value)}
            />
          </Styled.SliderLabel>
          <Styled.ControlLabel
            label="Private game"
            control={(
              <Checkbox
                color="primary"
                checked={isPrivate}
                name="isPrivate"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
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
      )}
    </Formik>
  );
};

export default CreateGame;
