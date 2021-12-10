import { IStartGameButton } from 'components/StartGameButton/IStartGameButton';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { socketActions, socketTopics } from 'store/socket/socket';
import * as Styled from './StartGameButton.styled';

const StartGameButton = ({
  arePlayersReady,
  numberOfPlayers,
}: IStartGameButton): JSX.Element => {
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
      return 'Waiting for players';
    }
    if (arePlayersReady) {
      return 'Start Game';
    }
    if (started) {
      return 'Setting up the game';
    }
    return 'Waiting for others';
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
