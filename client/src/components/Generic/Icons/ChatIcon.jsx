import React from "react";
import { SvgIcon } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as ChatIconSvg } from "../../../assets/icons/freepick/chat.svg";

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

const ChatIcon = props => {
  return (
    <StyledContainer onClick={props.handler} name={props.name}>
      <SvgIcon {...props} component={ChatIconSvg} viewBox="0 0 512 512" />
    </StyledContainer>
  );
};

export default ChatIcon;
