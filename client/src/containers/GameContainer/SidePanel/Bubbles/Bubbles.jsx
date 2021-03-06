import React from "react";
import styled from "styled-components";
import Bubble from "../Bubble/Bubble";

const Container = styled.div`
  display: flex;
`;

const Bubbles = ({ panels, openedPanel, updatedPanels, handler }) => {
  const bubbles = () => {
    return Object.keys(panels).map(panel => {
      return (
        <Bubble
          opened={openedPanel === panel}
          updated={updatedPanels && updatedPanels.indexOf(panel) !== -1}
          name={panel}
          handler={handler}
          key={panel}
        />
      );
    });
  };

  return <Container>{bubbles()}</Container>;
};

export default Bubbles;
