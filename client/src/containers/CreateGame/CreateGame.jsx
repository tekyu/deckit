import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { gameMapping } from "utils";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  emitter,
  CREATE_ROOM,
  UPDATE_ANON_USER,
  updatedUser
} from "store/actions";
import selectUser from "store/selectors/selectUser";
import sillyname from "sillyname";
import styled from "styled-components";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledButton = styled.button`
  border: 0;
  border-radius: 3px;
  background: transparent;
  background-image: linear-gradient(
    35deg,
    #2ac9db -10%,
    #009bff 47%,
    #cf77f3 130%
  );
  color: #fff;
  font-family: "Hammersmith One";
  font-size: 14px;
  padding: 16px 32px;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease-out;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.28);
  &:focus,
  &:hover,
  &:active {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.28);
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 15px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  margin: 15px 0;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  margin: 45px 0 15px 0;
  color: #009bff;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 20px 5px 100px rgba(207, 119, 243, 0.1),
    0px 5px 100px rgba(0, 155, 255, 0.1),
    -20px 5px 100px rgba(42, 201, 219, 0.1);
  border-radius: 6px;
  padding: 60px;
`;

const StyledHeader = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
`;

const StyledSliderLabel = styled.label`
  width: 100%;
  margin: 25px 0;
`;

const StyledErrorMessage = styled.div`
  color: #cb3066;
`;

const getOptions = () =>
  Object.keys(gameMapping).map(gameCode => (
    <option key={gameCode} value={gameCode}>
      {gameMapping[gameCode].name}
    </option>
  ));

const validate = ({ isPrivate, username, name }) => {
  console.log("validate", username, isPrivate);
  const errors = {};
  if (!username.trim()) {
    errors.username =
      "You need to specify your name or login in order to create game";
  }
  if (!name.trim()) {
    errors.name = "Game name cannot be empty";
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
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        gameCode: "d",
        name: sillyname(),
        playersMax: 10,
        isPrivate: true,
        username: sillyname()
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("onsubmit", values);
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
          <StyledForm>
            <StyledHeader>Create new game</StyledHeader>
            {!userData && (
              <React.Fragment>
                <StyledTextField
                  label="Your nickname"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={username}
                />
                <ErrorMessage
                  name="username"
                  render={msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
                />
              </React.Fragment>
            )}
            <React.Fragment>
              <StyledTextField
                label="Room name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={name}
              />
              <StyledErrorMessage name="name" />
            </React.Fragment>
            {/* <Field as="select" name="gameCode">
              {getOptions()}
            </Field> */}
            <StyledSliderLabel htmlFor="playersMax">
              Maximum players in room
              <StyledSlider
                name="playersMax"
                defaultValue={4}
                min={2}
                max={10}
                step={1}
                valueLabelDisplay="on"
                onChange={(event, value) => {
                  return setFieldValue("playersMax", value);
                }}
              />
            </StyledSliderLabel>
            <StyledFormControlLabel
              label="Private game"
              control={
                <Checkbox
                  checked={isPrivate}
                  name="isPrivate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              }
            />
            <StyledButton type="submit" disabled={isSubmitting}>
              Create
            </StyledButton>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default CreateGame;
