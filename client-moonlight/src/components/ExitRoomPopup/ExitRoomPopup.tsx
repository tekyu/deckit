import Backdrop from 'components/Backdrop/Backdrop';
import Button from 'components/Button/Button';
import { IExitRoomPopup } from 'components/ExitRoomPopup/IExitRoomPopup';
import * as Styled from './ExitRoomPopup.styled';

const ExitRoomPopup = ({
  closeHandler = () => { },
}: IExitRoomPopup): JSX.Element => {
  const leaveRoomHandler = () => {
    closeHandler();
  };
  return (
    <Backdrop>
      <Styled.ExitRoomPopup>
        <Styled.Header>
          Do you want to leave room?
        </Styled.Header>
        <Styled.Controls>
          <Button
            type="button"
            palette="primary"
            variant="main"
            version="contained"
            onClick={closeHandler}
          >
            No
          </Button>
          <Button
            type="button"
            palette="primary"
            variant="main"
            version="text"
            onClick={leaveRoomHandler}
          >
            Leave room
          </Button>
        </Styled.Controls>
      </Styled.ExitRoomPopup>
    </Backdrop>
  );
};

export default ExitRoomPopup;
