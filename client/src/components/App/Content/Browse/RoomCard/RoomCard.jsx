import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "components/Generic";
import * as Styled from "./RoomCard.styled";

const RoomCard = ({ isAnonymous, options }) => {
  const {
    id,
    name,
    owner,
    playersCurrent,
    playersMax,
    isPublic,
    gameCode
  } = options;
  return (
    <Styled.Container>
      <Styled.Logo>{gameCode.toUpperCase()}</Styled.Logo>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Owner>{owner}</Styled.Owner>
      <Styled.Content>
        <Styled.Details>
          <Styled.Players>
            {playersCurrent}/{playersMax}
          </Styled.Players>
          <Styled.Mode>{isPublic ? `Public` : `Private`}</Styled.Mode>
        </Styled.Details>
      </Styled.Content>
      <Link to={`/game/${id}`} value={id}>
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    playersCurrent: PropTypes.number.isRequired,
    playersMax: PropTypes.number.isRequired,
    isPublic: PropTypes.bool.isRequired,
    gameCode: PropTypes.string.isRequired
  }).isRequired
};

export default memo(RoomCard);
