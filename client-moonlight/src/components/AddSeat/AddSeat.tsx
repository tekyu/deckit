import { IAddSeat } from 'components/AddSeat/IAddSeat';
import { useTranslation } from 'react-i18next';
import { BiUserPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { socketActions, socketTopics } from 'store/socket/socket';
import * as Styled from './AddSeat.styled';

const AddSeat = ({
  current = 0,
  max = 0,
}: IAddSeat): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addSeat = () => {
    if (current < max) {
      dispatch(socketActions.emit(
        socketTopics.room.updateNumberOfSeats, { action: 'add' },
      ));
    }
  };

  return (
    <Styled.AddSeat onClick={addSeat}>
      <Styled.Bubble>
        <BiUserPlus />
      </Styled.Bubble>
      <Styled.Label>
        {t('waiting.addSeat')}
      </Styled.Label>
    </Styled.AddSeat>
  );
};

export default AddSeat;
