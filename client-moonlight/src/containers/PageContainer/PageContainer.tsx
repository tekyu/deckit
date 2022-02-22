import React, { useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import Routes from 'components/Routes/Routes';
import { useSelector } from 'react-redux';
import { userActions, userSelectors } from 'store/user/userSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { useAppThunkDispatch } from 'store/store';
import { roomActions, roomSelectors } from 'store/room/roomSlice';
import ReconnectScreen from 'components/ReconnectScreen/ReconnectScreen';
import * as Styled from './PageContainer.styled';

const PageContainer = (): JSX.Element => {
  const { username, anonymous, id } = useSelector(userSelectors.user);
  const activeRoomId = useSelector(roomSelectors.activeRoomId);
  const [showReconnectPopup, setShowReconnectPopup] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();

  const onReconnectScreenCloseHandler = () => {
    setShowReconnectPopup(false);
  };

  const onUpdateAnonUser = ({
    id,
    reconnectable,
  }: { id: string, reconnectable: string }) => {
    dispatch(userActions.initializeUser({ id }));
    setShowReconnectPopup(!!reconnectable);
    if (!reconnectable) {
      dispatch(roomActions.resetRoom());
    }
  };

  useEffect(() => {
    dispatch(socketActions.emit(socketTopics.user.updateAnonUser, {
      username, anonymous, id, activeRoomId,
    }, onUpdateAnonUser));
  }, [username, anonymous]);

  const syncHandler = () => {
    dispatch(socketActions.emit(socketTopics.user.updateAnonUser, {
      username, anonymous, id, activeRoomId,
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
      {showReconnectPopup && (
        <ReconnectScreen
          roomId={activeRoomId}
          closeHandler={onReconnectScreenCloseHandler}
        />
      )}
      <Header />
      <Styled.Container>
        <Routes />
      </Styled.Container>
    </Styled.PageContainer>
  );
};

export default PageContainer;
