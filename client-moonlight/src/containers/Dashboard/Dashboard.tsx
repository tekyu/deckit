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
import { AnyAction } from 'redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as Styled from './Dashboard.styled';

interface IRoomIdForm {
  roomId: string;
}

const noRoomToastId = 'noRoomToast';

const Dashboard = (): JSX.Element => {
  const { t } = useTranslation();
  const [redirectToGame, setRedirectToGame] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const roomId = useSelector(roomSelectors.activeRoomId);

  useEffect(() => {
    if (roomId) {
      dispatch(roomActions.resetRoom());
    }
  }, []);

  const submitRoomIdHandler = (
    { roomId }: IRoomIdForm,
    { setFieldError }: FormikHelpers<IRoomIdForm>,
  ) => {
    dispatch(roomActions.joinRoom({ roomId }))
      .then(({ type, error }: AnyAction) => {
        if (type.includes('rejected')) {
          setFieldError('roomId', t(`errors.room.connect.${error.message}`));
          toast.error(t(`errors.room.connect.${error.message}`), {
            position: 'top-right',
            toastId: `${noRoomToastId}-${roomId}`,

          });
        } else {
          setRedirectToGame(true);
        }
      }).catch(() => {
        setFieldError('roomId', t('errors.room.connect.undefined'));
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
