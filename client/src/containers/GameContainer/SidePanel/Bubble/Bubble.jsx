import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ScoreIcon from "../../../../components/Generic/Icons/ScoreIcon";
import ChatIcon from "../../../../components/Generic/Icons/ChatIcon";

const Container = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin: 4px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  &:first-of-type {
    margin-left: 0;
  }
  ${({ opened }) =>
    opened &&
    `
    background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
    );
    color: #fff;
  `}
  ${({ updated }) =>
    updated &&
    `
    &:after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 10px;
      background: orange;
      top: 0;
      right: -5px;
    }
  `}
`;
const Bubble = ({ handler, opened, updated, name }) => {
  const getBubbleIcon = name => {
    switch (name) {
      case "score":
        return <ScoreIcon name={name} onClick={handler} />;
      case "chat":
        return <ChatIcon name={name} onClick={handler} />;
      default:
        return null;
    }
  };
  return (
    <Container name={name} opened={opened} updated={updated} onClick={handler}>
      {getBubbleIcon(name)}
    </Container>
  );
};

Bubble.propTypes = {
  handler: PropTypes.func.isRequired,
  name: PropTypes.string,
  opened: PropTypes.bool,
  updated: PropTypes.bool,
  icon: PropTypes.elementType
};

Bubble.defaultProps = {
  handler: () => {},
  name: "chat",
  opened: false,
  updated: false
};

export default Bubble;
