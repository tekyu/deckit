import React from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 60px;
`;

const PlayerCounterWithIcon = ({ playersNow, playersMax }) => {
  return (
    <StyledContainer>
      <Icon icon="user" size={20} />
      <span>
        {playersNow} / {playersMax}
      </span>
    </StyledContainer>
  );
};

export default PlayerCounterWithIcon;
