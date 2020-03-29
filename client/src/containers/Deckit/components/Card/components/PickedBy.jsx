import React from "react";
import styled from "styled-components";
import PlayerBubble from "../../../../../components/Generic/PlayerBubble/PlayerBubble";

const StyledContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28);
  padding: 10px;
  border-radius: 6px;
  text-align: right;
  justify-content: flex-end;
  align-self: flex-end;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const StyledBubblesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 6px;
`;

const StyledPlayerBubble = styled(PlayerBubble)`
  margin: 4px -6px;
`;

const PickedBy = ({ pickedBy }) => {
  const getPlayers = pickedBy.map(({ id, avatar, color }) => {
    return <StyledPlayerBubble avatar={avatar} color={color} key={id} />;
  });
  return (
    <StyledContainer>
      <p>Picked by</p>
      <StyledBubblesContainer>{getPlayers}</StyledBubblesContainer>
    </StyledContainer>
  );
};

export default PickedBy;
