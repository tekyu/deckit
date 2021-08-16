import React from 'react';
import styled from 'styled-components';
import PlaceholderCard from '../PlaceholderCard/PlaceholderCard';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;

type placeholderCardType = {
  amount: number;
}

interface IPlaceholderCardsList {
  cards: placeholderCardType[];
}

const PlaceholderCardsList = ({ cards }: IPlaceholderCardsList): JSX.Element => (
  <StyledContainer>
    <PlaceholderCard amount={cards.length} />
  </StyledContainer>
);

export default PlaceholderCardsList;
