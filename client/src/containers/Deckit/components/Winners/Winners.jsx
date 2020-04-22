import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { roomSelectors, deckitSelectors } from "store/selectors";
import {
  StyledContainer,
  StyledHeader,
  StyledName,
  StyledAnnouncement,
  StyledRunnersup,
  StyledScoreElement,
  StyledReturnButton,
  StyledLink,
  StyledLaurel,
  StyledRunnersupHeader
} from "./Winners.styled";
import ScoreElement from "../../../GameContainer/SidePanel/panels/score/components/ScoreElement";

const Winners = () => {
  const winners = useSelector(roomSelectors.winners);
  const players = useSelector(roomSelectors.players);
  const scoreboard = useSelector(roomSelectors.scoreboard);
  const maxScore = useSelector(deckitSelectors.maxScore);
  const sortedPlayers = [...players].sort((first, second) => {
    return scoreboard[second.id] - scoreboard[first.id];
  });
  const winner = sortedPlayers.shift();
  //   const winner = sortedPlayers.find(({ id }) => winners.indexOf(id) !== -1);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledAnnouncement>And the winner is</StyledAnnouncement>
        <StyledLaurel />
        <StyledName>{winner && winner.username}</StyledName>
        <StyledAnnouncement>Congratulations!</StyledAnnouncement>
      </StyledHeader>
      <StyledRunnersupHeader>Runners up</StyledRunnersupHeader>
      <StyledRunnersup>
        {sortedPlayers &&
          sortedPlayers.map(player => {
            return (
              <StyledScoreElement key={player.id}>
                <ScoreElement
                  player={player}
                  score={scoreboard[player.id]}
                  progress={(scoreboard[player.id] / maxScore) * 100}
                />
              </StyledScoreElement>
            );
          })}
      </StyledRunnersup>
      <StyledLink to={`/`}>
        <StyledReturnButton
          variant="contained"
          color="primary"
          aria-label="return to main menu"
        >
          Return to main menu
        </StyledReturnButton>
      </StyledLink>
    </StyledContainer>
  );
};

export default Winners;
