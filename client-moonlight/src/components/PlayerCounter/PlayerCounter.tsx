import { IPlayerCounter } from 'components/PlayerCounter/IPlayerCounter';
import { BiUser } from 'react-icons/bi';
import * as Styled from './PlayerCounter.styled';

const PlayerCounter = ({
  max = 0,
  current = 0,
}: IPlayerCounter): JSX.Element => (
  <Styled.PlayerCounter>
    <Styled.CounterContainer>
      <Styled.Current>{current}</Styled.Current>
      <Styled.Separator>/</Styled.Separator>
      <Styled.Max>{max}</Styled.Max>
    </Styled.CounterContainer>
    <Styled.IconContainer>
      <BiUser />
    </Styled.IconContainer>
  </Styled.PlayerCounter>
);

export default PlayerCounter;
