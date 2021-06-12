import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as ChatIconSvg } from "assets/icons/freepick/chat.svg";

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

const ChatIcon = ({ handler, name, ...rest }) => (
  <StyledContainer onClick={handler} name={name}>
    <SvgIcon {...rest} component={ChatIconSvg} viewBox="0 0 512 512" />
  </StyledContainer>
);

ChatIcon.defaultProps = {
  handler: () => { },
  name: `Chat Icon`,
};

ChatIcon.propTypes = {
  handler: PropTypes.func,
  name: PropTypes.string,
};

export default ChatIcon;
