import React from "react";
import styled from "styled-components";
import * as styles from "./ScoreElement.module.scss";
import PlayerBubble from "../../../../../../components/Generic/PlayerBubble/PlayerBubble";

const StyledProgressBarContainer = styled.div`
  height: 12px;
  border-radius: 3px;
  background: transparent;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.34);
`;

const StyledContainer = styled.div`
  margin: 2px 0;
  display: flex;
  align-items: center;
  padding: 8px 12px;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 6px;
`;

const StyledProgressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const StyledProgressBar = styled.span`
  display: block;
  height: 100%;
  width: 0%;
  transition: width 0.3s ease-out;
  background-image: linear-gradient(
    35deg,
    #2ac9db -10%,
    #009bff 47%,
    #cf77f3 130%
  );
  ${({ progress }) =>
    progress &&
    `
    width: ${progress}%`}
`;

const StyledPoints = styled.span`
  width: 30px;
`;

const ScoreElement = ({
  player: { id, avatar, username, color },
  score = 0,
  progress = 0
}) => {
  console.log("progrsss", progress, `${progress}%`);
  return (
    <StyledContainer id={id} className={styles.container}>
      <PlayerBubble avatar={avatar} color={color} />
      <StyledInfo className={styles.info}>
        <label>{username}</label>
        <StyledProgressContainer className={styles.progressContainer}>
          <StyledPoints>{score}</StyledPoints>
          <StyledProgressBarContainer>
            <StyledProgressBar progress={progress} />
          </StyledProgressBarContainer>
        </StyledProgressContainer>
      </StyledInfo>
    </StyledContainer>
  );
};

export default ScoreElement;
