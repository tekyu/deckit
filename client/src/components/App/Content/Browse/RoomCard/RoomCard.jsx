import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as Styled from "./RoomCard.styled";

const RoomCard = ({ options, isAnonymous }) => {
  const {
    id,
    name,
    createdBy,
    playersCurrent,
    playersMax,
    isPublic,
    gameCode
  } = options;
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Logo>
          <span>{gameCode.toUpperCase()}</span>
        </Styled.Logo>
      </Styled.Header>
      <Styled.Content>
        <Styled.Name>{name}</Styled.Name>
        <Styled.Owner>{createdBy}</Styled.Owner>
        <Styled.Details>
          <Styled.Players>
            <span>{playersCurrent}</span>
            <span>{playersMax}</span>
          </Styled.Players>
          <Styled.Mode>{isPublic ? `Public` : `Private`}</Styled.Mode>
        </Styled.Details>
      </Styled.Content>
      <Styled.Footer>
        <Link className="button--primary" to={`/game/${id}`} value={id}>
          {isAnonymous ? `Play as anonymous` : `Join`}
        </Link>
      </Styled.Footer>
    </Styled.Container>
  );
};

RoomCard.propTypes = {
  isAnonymous: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    playersCurrent: PropTypes.number.isRequired,
    playersMax: PropTypes.number.isRequired,
    isPublic: PropTypes.bool.isRequired,
    gameCode: PropTypes.string.isRequired
  }).isRequired
};

export default memo(RoomCard);
