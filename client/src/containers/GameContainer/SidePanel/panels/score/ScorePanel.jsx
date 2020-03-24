import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import selectPlayers from "../../../../../store/selectors/selectPlayers";
import ScoreList from "./components/ScoreList/ScoreList";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledContainer = styled.div``;

const ScorePanel = () => {
  return (
    <StyledContainer>
      <ScoreList />
    </StyledContainer>
  );
};

export default ScorePanel;
