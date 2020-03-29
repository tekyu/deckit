import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ScoreElement from "../ScoreElement";
import selectScoreboard from "../../../../../../../store/selectors/selectScoreboard";
import selectPlayers from "../../../../../../../store/selectors/selectPlayers";
import selectActiveRoom from "../../../../../../../store/selectors/selectActiveRoom";
import selectMaxScore from "../../../../../../../store/deckit/selectors/selectMaxScore";

const StyledContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ScoreList = () => {
  const { players, scoreboard } = useSelector(selectActiveRoom);
  const maxScore = useSelector(selectMaxScore);
  const [playersList, setPlayersList] = useState([]);
  useEffect(() => {}, [players, scoreboard]);
  useEffect(() => {
    setPlayersList(() => {
      console.log("setPlayersList", JSON.stringify(scoreboard), maxScore);
      return players.map(player => {
        return (
          <ScoreElement
            key={player.id}
            player={player}
            score={scoreboard[player.id]}
            progress={(scoreboard[player.id] / maxScore) * 100}
          />
        );
      });
    });
  }, [players, scoreboard]);
  return <StyledContainer>{playersList}</StyledContainer>;
};

export default ScoreList;
