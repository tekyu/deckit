import { IStartGameButton } from 'components/StartGameButton/IStartGameButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { socketActions, socketTopics } from 'store/socket/socket';
import * as Styled from './StartGameButton.styled';

const StartGameButton = ({
  arePlayersReady,
  numberOfPlayers,
}: IStartGameButton): JSX.Element => {
  const { t } = useTranslation();
  const [started, setStarted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const clickHandler = () => {
    if (!arePlayersReady || started) {
      return null;
    }
    dispatch(socketActions.emit(socketTopics.room.start));
    setStarted(true);
    return null;
  };

  const getText = () => {
    if (numberOfPlayers <= 1) {
      return t('waiting.actionButton.waiting');
    }
    if (arePlayersReady) {
      return t('waiting.actionButton.start');
    }
    if (started) {
      return t('waiting.actionButton.settingUp');
    }
    return t('waiting.actionButton.waiting');
  };

  return (
    <Styled.StartGameButton
      palette="primary"
      version="contained"
      type="button"
      variant="main"
      onClick={clickHandler}
      disabled={!arePlayersReady}
    >
      {getText()}

    </Styled.StartGameButton>
  );
};

export default StartGameButton;
