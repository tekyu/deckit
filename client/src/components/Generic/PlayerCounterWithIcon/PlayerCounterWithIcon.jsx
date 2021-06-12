import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "../Icon/Icon";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 60px;
`;

const PlayerCounterWithIcon = ({ playersNow, playersMax }) => (
  <StyledContainer>
    <Icon icon="user" size={20} />
    <span>
      {playersNow}
      {` `}
      /
      {playersMax}
    </span>
  </StyledContainer>
);

PlayerCounterWithIcon.defaultProps = {
  playersMax: 0,
};

PlayerCounterWithIcon.propTypes = {
  playersNow: PropTypes.number.isRequired,
  playersMax: PropTypes.number,
};

export default PlayerCounterWithIcon;
