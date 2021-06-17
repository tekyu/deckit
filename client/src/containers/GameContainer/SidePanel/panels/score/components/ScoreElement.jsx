import React from "react";
import PropTypes from "prop-types";
import PlayerBubble from "components/Generic/PlayerBubble/PlayerBubble";
import * as Styled from './ScoreElement.styled';

const ScoreElement = ({
  player: {
    id, avatar, username, color,
  },
  score = 0,
  progress = 0,
  didPick = false,
}) => (
  <Styled.Container id={id} progress={progress} didNotPick={!didPick}>
    <Styled.InfoContainer>
      <PlayerBubble avatar={avatar} color={color} didPick={didPick} />
      <Styled.Info>
        <Styled.Username>{username}</Styled.Username>
        <Styled.Score>{score}</Styled.Score>
      </Styled.Info>
    </Styled.InfoContainer>
  </Styled.Container>
);

ScoreElement.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  didPick: PropTypes.bool.isRequired,
};

export default ScoreElement;
