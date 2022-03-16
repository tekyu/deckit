import Backdrop from 'components/Backdrop/Backdrop';
import Button from 'components/Button/Button';
import { IReconnectScreen } from 'components/ReconnectScreen/IReconnectScreen';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AnyAction } from 'redux';
import { roomActions } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { useAppThunkDispatch } from 'store/store';
import { userSelectors } from 'store/user/userSlice';
import * as Styled from './ReconnectScreen.styled';

const ReconnectScreen = ({
  roomId,
  closeHandler = () => { },
}: IReconnectScreen): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppThunkDispatch();
  const playerId = useSelector(userSelectors.id);
  const reconnectHandler = () => {
    dispatch(roomActions.reconnect({ playerId, roomId })).then(({ payload }: AnyAction) => {
      if (payload) {
        history.replace(`/game/${payload}`);
      }
      closeHandler();
    });
  };

  const cancelHandler = () => {
    dispatch(roomActions.resetRoom());
    dispatch(socketActions.emit(socketTopics.room.denyReconnecting, { roomId }));
    history.replace('/');
    closeHandler();
  };

  return (
    <Backdrop>
      <Styled.ReconnectScreen>
        <Styled.Header>
          {t('reconnectScreen.header')}
          <Styled.Id>
            {roomId}
          </Styled.Id>
        </Styled.Header>
        <Styled.Message>
          {t('reconnectScreen.wantToReconnect')}
        </Styled.Message>
        <Styled.Controls>
          <Button
            type="button"
            palette="primary"
            variant="main"
            version="contained"
            onClick={reconnectHandler}
          >
            {t('reconnectScreen.button.yes')}
          </Button>
          <Button
            type="button"
            palette="primary"
            variant="main"
            version="text"
            onClick={cancelHandler}
          >
            {t('reconnectScreen.button.no')}

          </Button>

        </Styled.Controls>
      </Styled.ReconnectScreen>
    </Backdrop>
  );
};

export default ReconnectScreen;
