import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 135px;
  height: 200px;
  background-color: green;
  margin: 0 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
`;
const PlaceholderCard = () => {
  return <StyledContainer />;
};

export default PlaceholderCard;
