import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "components/Generic";
import * as Styled from "./RoomCard.styled";

const RoomCard = ({ isAnonymous, options }) => {
  const {
    gameCode,
    isPublic,
    name,
    owner,
    players,
    playersMax,
    roomId
  } = options;
  return (
    <Styled.Container>
      <Styled.Logo>{gameCode.toUpperCase()}</Styled.Logo>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Owner>{owner}</Styled.Owner>
      <Styled.Content>
        <Styled.Details>
          <Styled.Players>
            {players.length}/{playersMax}
          </Styled.Players>
          <Styled.Mode>{isPublic ? `Public` : `Private`}</Styled.Mode>
        </Styled.Details>
      </Styled.Content>
      <Link to={`/game/${roomId}`} value={roomId}>
        <Button preset={`primary`}>
          {isAnonymous ? `Play as anonymous` : `Join`}
        </Button>
      </Link>
    </Styled.Container>
  );
};

RoomCard.propTypes = {
  isAnonymous: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    gameCode: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    playersMax: PropTypes.number.isRequired,
    roomId: PropTypes.string.isRequired
  }).isRequired
};

export default memo(RoomCard);
