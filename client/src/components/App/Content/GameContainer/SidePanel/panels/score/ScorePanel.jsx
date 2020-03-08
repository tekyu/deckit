import React, { useState, useEffect, useCallback } from "react";
import { listener, emitter } from "store/actions";
import { useSelector, useDispatch } from "react-redux";
import selectUser from "store/selectors/selectUser";
import selectActiveRoomId from "store/selectors/selectActiveRoomId";
import selectActiveRoom from "store/selectors/selectActiveRoom";
import styled from "styled-components";
import ScoreList from "./components/ScoreList/ScoreList";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledContainer = styled.div``;

const ScorePanel = () => {
  // const user = useSelector(selectUser);
  const activeRoomId = useSelector(selectActiveRoomId);
  const dispatch = useDispatch();
  const [scoreData, setScoreData] = useState([]);

  console.log("ScorePanel", scoreData);

  const getScoreData = useCallback(() => {
    dispatch(
      emitter(`getScoreData`, { activeRoomId }, newScoreData => {
        setScoreData(newScoreData);
      })
    );
  }, [activeRoomId, dispatch]);

  useEffect(() => {
    getScoreData();
  }, []);

  const mockData = [
    {
      id: `test1`,
      avatar: null,
      username: `test1`,
      color: `red`,
      progress: 0.4,
      points: 14
    },
    {
      id: `test2`,
      avatar: null,
      username: `test2`,
      color: `black`,
      progress: 0.7,
      points: 17
    },
    {
      id: `test3`,
      avatar: null,
      username: `test3`,
      color: `purple`,
      progress: 0.6,
      points: 16
    }
  ];
  // const dispatch = useDispatch();
  return (
    <StyledContainer>
      <ScoreList data={scoreData} />
    </StyledContainer>
  );
};

export default ScorePanel;
