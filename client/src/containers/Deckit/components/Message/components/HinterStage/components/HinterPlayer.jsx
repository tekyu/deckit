import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import selectActiveRoom from "../../../../../../../store/selectors/selectActiveRoom";
import selectPlayers from "../../../../../../../store/selectors/selectPlayers";
import PlayerBubble from "../../../../../../../components/Generic/PlayerBubble/PlayerBubble";

const HinterPlayer = ({ hinterId }) => {
  const { players = [] } = useSelector(selectActiveRoom);
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
