import React from 'react';

import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import * as Styled from './Dashboard.styled';

interface IRoomIdForm {
  roomId: string;
}

const Dashboard = (): JSX.Element => {
  const submitRoomIdHandler = (values: IRoomIdForm) => {
    console.log('submitRoomIdHandler', values);
  };

  const validateRoomIdHandler = (values: IRoomIdForm) => {
    console.log('validateRoomIdHandler', values);
  };

  return (
    <Styled.Dashboard>
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
            <Styled.RoomIdInputContainer onSubmit={handleSubmit}>
              <TextInput value={roomId} name="roomId" id="roomId" placeholder="Type room id here" alignCenter showBorder />
              <Button type="submit">Join</Button>
            </Styled.RoomIdInputContainer>
          )}
        </Formik>
      </Styled.Controls>
    </Styled.Dashboard>
  );
};

export default Dashboard;
