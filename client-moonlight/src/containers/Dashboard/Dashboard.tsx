import React, { useEffect } from 'react';

import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';

import { userSelectors } from 'store/user/userSlice';
import { roomActions, roomSelectors } from 'store/room/roomSlice';
import * as Styled from './Dashboard.styled';

interface IRoomIdForm {
  roomId: string;
}

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const roomId = useSelector(roomSelectors.activeRoomId);
  const { id, username, anonymous } = useSelector(userSelectors.user);

  useEffect(() => {
    if (roomId) {
      dispatch(roomActions.resetRoom());
    }
  }, []);

  const submitRoomIdHandler = ({ roomId }: IRoomIdForm) => {
    dispatch(roomActions.joinRoom({ roomId, userData: { id, username, anonymous } }));
  };

  const validateRoomIdHandler = ({ roomId }: IRoomIdForm) => {
    const errors: Partial<IRoomIdForm> = {};

    if (!roomId) {
      errors.roomId = 'Id cannot be empty';
    }

    return errors;
  };

  return (
    <Styled.Dashboard>
      {roomId ? <Redirect push to={`/game/${roomId}`} /> : null}
      <Styled.Controls>
        <Link to="/create">
          <Button>Create your room</Button>
        </Link>
        <Styled.Separator>or</Styled.Separator>
        <Formik
          initialValues={{ roomId: '' }}
          onSubmit={submitRoomIdHandler}
          validate={validateRoomIdHandler}
        >
          {({ values: { roomId }, handleSubmit }) => (
            <>
              <Styled.RoomIdInputContainer onSubmit={handleSubmit}>
                <TextInput value={roomId} name="roomId" id="roomId" placeholder="Type room id here" alignCenter showBorder />
                <Button type="submit">Join</Button>
              </Styled.RoomIdInputContainer>
              <ErrorMessage name="roomId" />
            </>
          )}
        </Formik>
      </Styled.Controls>
    </Styled.Dashboard>
  );
};

export default Dashboard;
