import React from "react";
import { SvgIcon } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as LaurelIconSvg } from "../../../assets/icons/freepick/laurel.svg";

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
  svg {
    overflow: visible;
  }
`;

const LaurelIcon = props => {
  return (
    <StyledContainer {...props}>
      <SvgIcon
        {...props}
        component={LaurelIconSvg}
        viewBox="0 -51 512.00202 512"
      />
    </StyledContainer>
  );
};

export default LaurelIcon;
