import React from "react";
import styled from "styled-components";
import Bubble from "../Bubble/Bubble";

const Container = styled.div`
  display: flex;
`;

const Bubbles = ({ panels, openedPanel, handler }) => {
  const bubbles = () => {
    return Object.keys(panels).map(panel => {
      return (
        <Bubble
          openedPanel={openedPanel === panel}
          name={panel}
          handler={handler}
          key={panel}
        ></Bubble>
      );
    });
  };

  return <Container>{bubbles()}</Container>;
};

export default Bubbles;
