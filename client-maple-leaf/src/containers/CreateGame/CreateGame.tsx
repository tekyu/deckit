// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import sillyname from 'sillyname';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { updatedUser } from 'store/user/userActions';
import { emitter } from 'store/socket/socketActions';
import { CREATE_ROOM } from 'store/room/roomActions';
import { selectUser } from 'store/user/userSelectors';
import * as Styled from './CreateGame.styled';

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
type validateProps = {
  username?: string;
  name?: string;
  gameCode?: string;
  maxScore?: string | number;
  playersMax?: string | number;
  isPrivate?: boolean;
}

type roomOptionsProps = {
  mode: string;
  playersMax?: number;
  name?: string;
  gameCode?: string;
  username?: string;
  gameOptions: {
    maxScore?: number
  }
}

type createGameProps = {
  isPrivate?: boolean
  playersMax?: string | number;
  name?: string;
  maxScore?: string | number;
  gameCode?: string;
  username?: string;
}

const validate = ({ username, name }: validateProps) => {
  const errors: validateProps | null = {};
  if (!username?.trim()) {
    errors.username = 'You need to specify your name or login in order to create game';
  }
  if (!name?.trim()) {
    errors.name = 'Game name cannot be empty';
  }
  return errors;
};

const CreateGame = (): JSX.Element => {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const createRoom = (roomOptions: roomOptionsProps, id: string) => {
    console.log('createRoom', roomOptions);
    dispatch(
      emitter(
        CREATE_ROOM,
        { roomOptions, id },
        ({ error, roomId }: { error: string; roomId: string }) => {
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
    gameCode,
    username,
  }: createGameProps) => {
    const roomOptions: roomOptionsProps = {
      mode: isPrivate ? 'private' : 'public',
      playersMax: playersMax ? +playersMax : undefined,
      name,
      gameCode,
      username,
      gameOptions: { maxScore: maxScore ? +maxScore : undefined },
    };

    if (userData) {
      createRoom(roomOptions, userData.id);
    } else {
      const handlerFunction = ({ id }: { id: string }) => createRoom(roomOptions, id);
      console.log('handlerFunction', handlerFunction);
      dispatch(
        updatedUser(username, handlerFunction),
      );
    }
  };
  return (
    <Formik
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        gameCode: 'd',
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
              onChange={(_event: React.ChangeEventHandler<HTMLInputElement>, value: string) => setFieldValue('playersMax', value)}
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
              onChange={(_event: React.ChangeEventHandler<HTMLInputElement>, value: string) => setFieldValue('maxScore', value)}
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
