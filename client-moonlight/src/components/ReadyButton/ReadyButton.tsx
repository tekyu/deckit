import { IReadyButton } from 'components/ReadyButton/IReadyButton';
import { roomActions } from 'store/room/roomSlice';
import { useAppThunkDispatch } from 'store/store';
import { AnyAction } from 'redux';
import { toast } from 'react-toastify';
import * as Styled from './ReadyButton.styled';

const ReadyButton = ({
  isReady = false,
  state,
}: IReadyButton): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  const clickHandler = () => {
    dispatch(roomActions.changeUserState({ state: state === 0 ? 1 : 0 }))
      .then(({ type, error }: AnyAction) => {
        if (type.includes('rejected')) {
          toast.error(error, {
            position: 'top-right',
            toastId: 'something-went-wrong',
          });
        }
      });
  };
  return (
    <Styled.ReadyButton
      palette="primary"
      version="contained"
      type="button"
      variant="main"
      onClick={clickHandler}
      isReady={isReady}
    >
      {isReady ? 'Change to waiting' : 'Change to ready'}
    </Styled.ReadyButton>
  );
};

export default ReadyButton;
