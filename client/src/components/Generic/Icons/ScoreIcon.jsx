import React from "react";
import { SvgIcon } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as ScoreIconSvg } from "../../../assets/icons/freepick/score.svg";

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

const ScoreIcon = props => {
  return (
    <StyledContainer onClick={props.handler} name={props.name}>
      <SvgIcon
        {...props}
        component={ScoreIconSvg}
        viewBox="0 -51 512.00202 512"
      />
    </StyledContainer>
  );
};

export default ScoreIcon;
