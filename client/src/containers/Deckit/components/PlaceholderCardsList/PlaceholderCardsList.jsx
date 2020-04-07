import React from "react";
import styled from "styled-components";
import PlaceholderCard from "../PlaceholderCard/PlaceholderCard";

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* margin-top: auto; */
  margin-bottom: auto;
`;
const PlaceholderCardsList = ({ cards }) => {
  return (
    <StyledContainer>
      {cards && cards.map(card => <PlaceholderCard key={card} />)}
    </StyledContainer>
  );
};

export default PlaceholderCardsList;
