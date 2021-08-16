import { IPickedBy } from 'containers/Deckit/components/Card/interfaces';
import React from 'react';
import * as Styled from './PickedBy.styled';

const PickedBy = ({ pickedBy = [] }: IPickedBy): JSX.Element => {
  const getPlayers = pickedBy.map(({ id, avatar, color }) => (
    <Styled.Bubble avatar={avatar} color={color} key={id} />
  ));
  return (
    <Styled.Container>
      <p>Picked by</p>
      <Styled.BubblesContainer>{getPlayers}</Styled.BubblesContainer>
    </Styled.Container>
  );
};

export default PickedBy;
