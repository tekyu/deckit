import { IBackdrop } from 'components/Backdrop/IBackdrop';
import * as Styled from './Backdrop.styled';

const Backdrop = ({
  children = 'Default',
}: IBackdrop): JSX.Element => <Styled.Backdrop>{children}</Styled.Backdrop>;

export default Backdrop;
