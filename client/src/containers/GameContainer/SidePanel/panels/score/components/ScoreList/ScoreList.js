import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";
import ScoreElement from "../ScoreElement";
import selectActiveRoom from "../../../../../../../store/selectors/selectActiveRoom";
import selectMaxScore from "../../../../../../../store/deckit/selectors/selectMaxScore";

const StyledContainer = styled.div`
  flex: 1 1 1px;
  overflow-y: auto;
`;

const ScoreList = () => {
  const { players, scoreboard } = useSelector(selectActiveRoom);
  const maxScore = useSelector(selectMaxScore);
  const [playersList, setPlayersList] = useState([]);
  useEffect(() => {
    setPlayersList(() => {
      const sortedPlayers = [...players].sort((first, second) => {
        return scoreboard[second.id] - scoreboard[first.id];
      });

      return sortedPlayers.map(player => {
        return (
          <Flipped key={player.id} flipId={player.id}>
            <ScoreElement
              key={player.id}
              player={player}
              score={scoreboard[player.id]}
              progress={(scoreboard[player.id] / maxScore) * 100}
            />
          </Flipped>
        );
      });
    });
  }, [maxScore, players, scoreboard]);
  return (
    <StyledContainer>
      <Flipper spring="stiff" flipKey={JSON.stringify(scoreboard)}>
        {playersList}
      </Flipper>
    </StyledContainer>
  );
};

export default ScoreList;
