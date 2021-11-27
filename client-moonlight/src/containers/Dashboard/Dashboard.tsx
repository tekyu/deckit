import React, { useEffect, useState } from 'react';

import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import TextInput from 'components/TextInput/TextInput';
import { Formik, FormikHelpers } from 'formik';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';

import { userSelectors } from 'store/user/userSlice';
import { roomActions, roomSelectors } from 'store/room/roomSlice';
import { useAppThunkDispatch } from 'store/store';
import { Action } from 'redux';
import { toast } from 'react-toastify';
import * as Styled from './Dashboard.styled';

interface IRoomIdForm {
  roomId: string;
}

const noRoomToastId = 'noRoomToast';

const Dashboard = (): JSX.Element => {
  const [redirectToGame, setRedirectToGame] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const roomId = useSelector(roomSelectors.activeRoomId);
  const { id, username, anonymous } = useSelector(userSelectors.user);

  useEffect(() => {
    if (roomId) {
      dispatch(roomActions.resetRoom());
    }
  }, []);

  const submitRoomIdHandler = (
    { roomId }: IRoomIdForm,
    { setFieldError }: FormikHelpers<IRoomIdForm>,
  ) => {
    dispatch(roomActions.joinRoom({ roomId, userData: { id, username, anonymous } }))
      .then(({ type }: Action) => {
        if (type.includes('rejected')) {
          setFieldError('roomId', `Room of id ${roomId} doesn't exist`);
          toast.error(`Room of id ${roomId} doesn't exist`, {
            position: 'top-right',
            toastId: `${noRoomToastId}-${roomId}`,

          });
        } else {
          setRedirectToGame(true);
        }
      }).catch((error: Action) => {
        setFieldError('roomId', `Room of id ${roomId} doesn't exist`);
      });
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
      {roomId && redirectToGame ? <Redirect push to={`/game/${roomId}`} /> : null}
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
