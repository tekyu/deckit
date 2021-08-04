import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import { emitter } from 'store/socket/socketActions';
import { Button } from 'components/Generic';
import * as Styled from './RoomJoining.styled';

const RoomJoining = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Styled.Container>
      <div>
        <NavLink to="/create">
          <Button variant="contained" color="primary" className="createbutton">
            Create your game
          </Button>
        </NavLink>
      </div>
      <Styled.Separator>or</Styled.Separator>
      <Formik
        validate={({ id }) => {
          if (!id) {
            return { id: 'Id cannot be empty' };
          }
          return {};
        }}
        initialValues={{
          id: '',
        }}
        onSubmit={({ id }, actions) => {
          // check for room
          // if cannot join get error
          dispatch(
            emitter('CHECK_FOR_ROOM', { id }, (roomFound) => {
              if (roomFound) {
                history.push(`/game/${id}`);
              } else {
                actions.setErrors({
                  id: 'Game doesn\'t exist or has already started',
                });
              }
            }),
          );
          // if can join push to history
        }}
      >
        <Styled.JoinForm>
          <Styled.JoinContainer>
            <Styled.JoinFieldContainer>
              <Styled.RoomIdField
                name="id"
                type="text"
                placeholder="Type room ID here"
              />
            </Styled.JoinFieldContainer>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="joinbutton"
            >
              Join
            </Button>
          </Styled.JoinContainer>
          <Typography color="error">
            <Styled.Error name="id" />
          </Typography>
        </Styled.JoinForm>
      </Formik>
    </Styled.Container>
  );
};

export default RoomJoining;
