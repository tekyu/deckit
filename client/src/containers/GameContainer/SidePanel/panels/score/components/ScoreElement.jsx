import React from "react";
import styled from "styled-components";
import PlayerBubble from "../../../../../../components/Generic/PlayerBubble/PlayerBubble";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px;
  position: relative;
  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 0%;
    ${({ progress }) =>
      progress &&
      `
    width: ${progress}%;`}

    background-image: linear-gradient(
      35deg,
      #2ac9db -10%,
      #009bff 47%,
      #cf77f3 130%
    );
    top: 0;
    left: 0;
  }
`;

const StyledInfoContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
`;

const StyledInfo = styled.div`
  width: 100%;
  margin-left: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledUsername = styled.div`
  font-size: 14px;
`;

const StyledScore = styled.div`
  font-size: 14px;
`;

const ScoreElement = ({
  player: { id, avatar, username, color },
  score = 0,
  progress = 0,
  didPick = false
}) => {
  return (
    <StyledContainer id={id} progress={progress} didNotPick={!didPick}>
      <StyledInfoContainer>
        <PlayerBubble avatar={avatar} color={color} didPick={didPick} />
        <StyledInfo>
          <StyledUsername>{username}</StyledUsername>
          <StyledScore>{score}</StyledScore>
        </StyledInfo>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

export default ScoreElement;
