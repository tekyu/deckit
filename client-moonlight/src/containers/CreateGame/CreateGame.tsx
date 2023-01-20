import React, { useState } from 'react';
import { Formik } from 'formik';
import sillyname from 'sillyname';
import TextInput from 'components/TextInput/TextInput';
import Panel from 'components/Panel/Panel';
import SliderWithTooltip from 'components/SliderWithTooltip/SliderWithTooltip';
import Switch from 'components/Switch/Switch';
import {
  BiArrowBack,
} from 'react-icons/bi';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Label from 'components/Label/Label';
import { useSelector } from 'react-redux';
import { roomActions, roomSelectors } from 'store/room/roomSlice';
import { Redirect } from 'react-router';
import { userSelectors } from 'store/user/userSlice';
import { IFormValues } from 'containers/CreateGame/ICreateGame';
import { ICreateRoom, ROOM_MODE } from 'store/room/roomInterfaces';
import { useAppDispatch } from 'store/store';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as Styled from './CreateGame.styled';

const CreateGame = (): JSX.Element => {
  const { t } = useTranslation();
  const [redirectToGame, setRedirectToGame] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const roomId = useSelector(roomSelectors.id);
  const {
    username, id: userId, anonymous,
  } = useSelector(userSelectors.user);

  const submitGameFormHandler = ({
    name, gameCode, playersMax, maxScore, isPrivate,
  }: IFormValues) => {
    // const createParams: ICreateRoom = {
    //   userData: {
    //     username,
    //     id: userId,
    //     anonymous,
    //   },
    //   name,
    //   gameCode,
    //   playersMax,
    //   maxScore,
    //   mode: isPrivate ? ROOM_MODE.private : ROOM_MODE.public,
    // };
    // console.log('createdata', createParams);
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // dispatch(roomActions.createRoom(createParams)).then(({ payload }: any) => {
    //   if (payload?.roomDetails) {
    //     setRedirectToGame(true);
    //   }
    // });
  };

  const validateGameFormHandler = (values: IFormValues) => {
    const errors: { name?: string } = {};
    if (!values.name) {
      errors.name = t('errors.room.connect.nameEmpty');
    }
    return errors;
  };

  return (
    <CSSTransition
      in
      timeout={3000}
      classNames="create-game"
      unmountOnExit
    >
      <Styled.CreateGame>
        {redirectToGame && roomId ? <Redirect push to={`/game/${roomId}`} /> : null}
        <Panel>

          <Formik
            initialValues={{
              gameCode: 'd',
              name: sillyname(),
              playersMax: 4,
              maxScore: 60,
              isPrivate: true,
            }}
            validate={validateGameFormHandler}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={submitGameFormHandler}
          >
            {({
              values: {
                name, playersMax, maxScore, isPrivate,
              },
              handleSubmit,
              setFieldValue,
            }) => (
              <Styled.Form onSubmit={handleSubmit}>
                <Styled.GoBack to="/"><BiArrowBack /></Styled.GoBack>
                <Styled.Header>{t('createGame.header')}</Styled.Header>
                <Styled.Row>
                  <Styled.LabelContainer>
                    <Label>{t('createGame.roomNameHeader')}</Label>
                    <Styled.GenerateRandomName
                      onClick={() => setFieldValue('name', sillyname())}
                      version="text"
                    >
                      {t('createGame.generateName')}
                    </Styled.GenerateRandomName>
                  </Styled.LabelContainer>
                  <TextInput value={name} showBorder name="name" id="name" />
                  <ErrorMessage name="name" />
                </Styled.Row>
                <Styled.Row>
                  <SliderWithTooltip
                    name="playersMax"
                    label={t('createGame.maxPlayersHeader')}
                    sliderProps={{
                      min: 2,
                      max: 10,
                      defaultValue: playersMax,
                      step: 1,
                    }}
                  />
                </Styled.Row>
                <Styled.Row>
                  <SliderWithTooltip
                    name="maxScore"
                    label={t('createGame.maxPoints')}
                    sliderProps={{
                      min: 5,
                      max: 120,
                      defaultValue: maxScore,
                      step: 5,
                    }}
                  />
                </Styled.Row>
                <Styled.Row>
                  <Switch
                    label={t('createGame.privateRoom')}
                    name="isPrivate"
                    value={isPrivate}
                  />
                </Styled.Row>
                <Styled.ButtonContainer>
                  <Styled.SubmitButton type="submit">{t('createGame.createButton')}</Styled.SubmitButton>
                </Styled.ButtonContainer>
              </Styled.Form>
            )}
          </Formik>
        </Panel>

      </Styled.CreateGame>
    </CSSTransition>
  );
};

export default CreateGame;
