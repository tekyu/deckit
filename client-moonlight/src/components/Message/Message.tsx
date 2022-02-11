import { IMessage } from 'components/Message/IMessage';
import * as Styled from './Message.styled';

const Message = ({
  children = 'Default',
  special = false,
}: IMessage): JSX.Element => <Styled.Message special={special}>{children}</Styled.Message>;

export default Message;
