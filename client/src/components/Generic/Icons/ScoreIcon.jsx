import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as ScoreIconSvg } from "assets/icons/freepick/score.svg";

const StyledContainer = styled.div`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 100%;
  }
`;

const ScoreIcon = ({ handler, name, ...rest }) => (
  <StyledContainer onClick={handler} name={name}>
    <SvgIcon
      {...rest}
      component={ScoreIconSvg}
      viewBox="0 -51 512.00202 512"
    />
  </StyledContainer>
);

ScoreIcon.defaultProps = {
  handler: () => { },
  name: `Score Icon`,
};

ScoreIcon.propTypes = {
  handler: PropTypes.func,
  name: PropTypes.string,
};

export default ScoreIcon;
