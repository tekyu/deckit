import React from "react";
import styled from "styled-components";
import Icon from "../../../Generic/Icon/Icon";

const StyledContainer = styled.div`
  margin: 0 10px 10px 10px;
  height: 200px;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledIconContainer = styled.div`
  margin-top: 40px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
`;
const StyledIcon = styled(Icon)`
  cursor: pointer;
`;

const AddSeat = ({ key, handler }) => {
  return (
    <StyledContainer key={key}>
      <StyledIconContainer>
        <StyledIcon icon="plus" size={60} onClick={handler} />
      </StyledIconContainer>
    </StyledContainer>
  );
};

export default AddSeat;
