import React from 'react';
import styled from 'styled-components';
import ScoreList from './components/ScoreList/ScoreList';
import ScoreInfo from './components/ScoreInfo/ScoreInfo';
import PlayersInfo from './components/PlayersInfo/PlayersInfo';

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

const ScorePanel = (): JSX.Element => (
  <StyledContainer>
    <ScoreInfo />
    <ScoreList />
    <PlayersInfo />
  </StyledContainer>
);

export default ScorePanel;
