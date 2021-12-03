import { IAddSeat } from 'components/AddSeat/IAddSeat';
import { BiUserPlus } from 'react-icons/bi';
import * as Styled from './AddSeat.styled';

const AddSeat = ({
  children = 'Default',
}: IAddSeat): JSX.Element => (
  <Styled.AddSeat>
    <Styled.Bubble>
      <BiUserPlus />
    </Styled.Bubble>
    <Styled.Label>
      Add seat
    </Styled.Label>
  </Styled.AddSeat>
);

export default AddSeat;
