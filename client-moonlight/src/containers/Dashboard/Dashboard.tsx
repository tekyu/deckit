import React, { useEffect, useState } from 'react';

import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import TextInput from 'components/TextInput/TextInput';
import { Formik, FormikHelpers } from 'formik';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';

import { userActions, userSelectors } from 'store/user/userSlice';
import { roomActions, roomSelectors } from 'store/room/roomSlice';
import { useAppThunkDispatch } from 'store/store';
import { AnyAction } from 'redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import PublicRoomList from 'components/PublicRoomList/PublicRoomList';
import * as Styled from './Dashboard.styled';

interface IRoomIdForm {
  roomId: string;
}

interface IJoinRoomHandler {
  roomId: string;
  formikHelpers: FormikHelpers<IRoomIdForm>;
}

const noRoomToastId = 'noRoomToast';

const Dashboard = (): JSX.Element => {
  const { t } = useTranslation();
  const [redirectToGame, setRedirectToGame] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const roomId = useSelector(roomSelectors.id);
  const kickedFrom = useSelector(userSelectors.kickedFrom);

  useEffect(() => {
    if (roomId) {
      dispatch(roomActions.resetRoom());
    }
  }, []);

  const joinRoomHandler = ({ roomId, formikHelpers: { setFieldError } }: IJoinRoomHandler) => {
    dispatch(roomActions.joinRoom({ roomId }))
      .then(({ type, error }: AnyAction) => {
        if (type.includes('rejected')) {
          setFieldError('roomId', t(`errors.room.connect.${error.message}`));
          toast.error(t(`errors.room.connect.${error.message}`), {
            position: 'top-right',
            toastId: `${noRoomToastId}-${roomId}`,
          });
          if (error.message === 'blacklisted') {
            dispatch(userActions.updateKickedFrom(roomId));
          }
        } else {
          setRedirectToGame(true);
        }
      }).catch(() => {
        setFieldError('roomId', t('errors.room.connect.undefined'));
      });
  };

  const submitRoomIdHandler = (
    { roomId }: IRoomIdForm,
    formikHelpers: FormikHelpers<IRoomIdForm>,
  ) => {
    if (kickedFrom[roomId]) {
      toast.error(t('errors.room.connect.blacklisted'), {
        position: 'top-right',
        toastId: `${noRoomToastId}-${roomId}`,
      });
      formikHelpers.setFieldError('roomId', t('errors.room.connect.blacklisted'));
    } else {
      joinRoomHandler({ roomId, formikHelpers });
    }
  };

  const validateRoomIdHandler = ({ roomId }: IRoomIdForm) => {
    const errors: Partial<IRoomIdForm> = {};

    if (!roomId) {
      errors.roomId = t('errors.room.connect.idEmpty');
    }

    return errors;
  };

  return (
    <Styled.Dashboard>
      {roomId && redirectToGame ? <Redirect push to={`/game/${roomId}`} /> : null}
      <Styled.Controls>
        <Link to="/create">
          <Button>{t('dashboard.createRoomButton')}</Button>
        </Link>
        <Styled.Separator>{t('common.or')}</Styled.Separator>
        <Formik
          initialValues={{ roomId: '' }}
          onSubmit={submitRoomIdHandler}
          validate={validateRoomIdHandler}
        >
          {({ values: { roomId }, handleSubmit }) => (
            <>
              <Styled.RoomIdInputContainer onSubmit={handleSubmit}>
                <TextInput
                  value={roomId}
                  name="roomId"
                  id="roomId"
                  placeholder={t('dashboard.joinInputPlaceholder')}
                  alignCenter
                  showBorder
                />
                <Button type="submit">{t('dashboard.joinButton')}</Button>
              </Styled.RoomIdInputContainer>
              <ErrorMessage name="roomId" />
            </>
          )}
        </Formik>
      </Styled.Controls>
      <PublicRoomList />
    </Styled.Dashboard>
  );
};

export default Dashboard;
