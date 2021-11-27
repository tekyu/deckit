import ICheckbox from 'components/Checkbox/ICheckbox';
import * as Styled from './Checkbox.styled';

const Checkbox = ({
  children = 'Default',
}: ICheckbox): JSX.Element => <Styled.Checkbox>{children}</Styled.Checkbox>;

export default Checkbox;
