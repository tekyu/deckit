import IGameContainer from 'containers/GameContainer/IGameContainer';
import * as Styled from './GameContainer.styled';

const GameContainer = ({
  children = 'Default',
}: IGameContainer): JSX.Element => <Styled.GameContainer>{children}</Styled.GameContainer>;

export default GameContainer;
