import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { roomSelectors } from "store/selectors";
import PlayerBubble from "../../../../../../../components/Generic/PlayerBubble/PlayerBubble";

const HinterPlayer = ({ hinterId }) => {
  const { players = [] } = useSelector(roomSelectors.activeRoom);
  const { avatar, color, username } =
    players.find(({ id }) => hinterId === id) || {};

  const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const StyledSpan = styled.span`
    margin-left: 12px;
  `;

  return (
    <StyledContainer>
      <PlayerBubble avatar={avatar} color={color} />
      <StyledSpan>{username} is choosing a hint. Please wait</StyledSpan>
    </StyledContainer>
  );
};

export default HinterPlayer;
