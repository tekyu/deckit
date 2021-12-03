import { IReadyButton } from 'components/ReadyButton/IReadyButton';
import { useDispatch } from 'react-redux';
import { roomActions } from 'store/room/roomSlice';
import * as Styled from './ReadyButton.styled';

const ReadyButton = ({
  id = '',
  isReady = false,
  state,
}: IReadyButton): JSX.Element => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(roomActions.changeUserState({ state: isReady ? 0 : 1 }));
  };
  return (
    <Styled.ReadyButton
      palette="primary"
      version="contained"
      type="button"
      variant="main"
      onClick={clickHandler}
    >
      {isReady ? 'Change to waiting' : 'Change to ready'}
    </Styled.ReadyButton>
  );
};

export default ReadyButton;
