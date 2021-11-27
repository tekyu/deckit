import ILabel from 'components/Label/ILabel';
import * as Styled from './Label.styled';

const Label = ({
  children = '',
}: ILabel): JSX.Element => <Styled.Label>{children}</Styled.Label>;

export default Label;
