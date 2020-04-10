import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ScoreList from "./components/ScoreList/ScoreList";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 1px;
`;

const ScorePanel = () => {
  return (
    <StyledContainer>
      <ScoreList />
    </StyledContainer>
  );
};

export default ScorePanel;
