import React from 'react';
import styled from 'styled-components';
import Bubble from '../Bubble/Bubble';

const Container = styled.div`
  display: flex;
`;

type PanelType = {
  icon: JSX.Element;
  listener: string
}

type PanelsType = {
  chat: PanelType;
  score: PanelType;
}

interface IBubbles {
  panels: PanelsType;
  openedPanel: string;
  updatedPanels: string[];
  handler: () => void
}

const Bubbles = ({
  panels, openedPanel = 'score', updatedPanels = [], handler,
}: IBubbles): JSX.Element => {
  const bubbles = () => Object.keys(panels).map((panel) => (
    <Bubble
      opened={openedPanel === panel}
      updated={updatedPanels && updatedPanels.indexOf(panel) !== -1}
      name={panel}
      handler={handler}
      key={panel}
    />
  ));

  return <Container>{bubbles()}</Container>;
};

export default Bubbles;
