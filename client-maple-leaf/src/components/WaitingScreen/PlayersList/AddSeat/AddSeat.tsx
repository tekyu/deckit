import React from 'react';
import * as Styled from './AddSeat.styled';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AddSeat = ({ handler = () => { } }: { handler: () => void }): JSX.Element => (
  <Styled.Container>
    <Styled.IconContainer>
      <Styled.ActionIcon icon="plus" size={60} onClick={handler} />
    </Styled.IconContainer>
  </Styled.Container>
);

export default AddSeat;
