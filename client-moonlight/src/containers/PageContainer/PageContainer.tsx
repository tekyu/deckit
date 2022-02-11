import React, { useEffect } from 'react';
import Header from 'components/Header/Header';
import Routes from 'components/Routes/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from 'store/user/userSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import * as Styled from './PageContainer.styled';

const PageContainer = (): JSX.Element => {
  const { username, anonymous, id } = useSelector(userSelectors.user);
  const dispatch = useDispatch();

  const onUpdateAnonUser = ({ id }: { id: string }) => {
    dispatch(userActions.initializeUser({ id }));
  };

  useEffect(() => {
    dispatch(socketActions.emit(socketTopics.user.updateAnonUser, {
      username, anonymous, id,
    }, onUpdateAnonUser));
  }, [username, anonymous]);

  const syncHandler = () => {
    dispatch(socketActions.emit(socketTopics.user.updateAnonUser, {
      username, anonymous, id,
    }, onUpdateAnonUser));
  };

  useEffect(() => {
    dispatch(socketActions.listener(socketTopics.user.syncBasicInfo, syncHandler));

    return () => {
      dispatch(socketActions.removeListener(socketTopics.user.syncBasicInfo, syncHandler));
    };
  }, []);

  return (
    <Styled.PageContainer>
      <Header />
      <Styled.Container>
        <Routes />
      </Styled.Container>
    </Styled.PageContainer>
  );
};

export default PageContainer;
