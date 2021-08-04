import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Bubble from '../Bubble/Bubble';

const Container = styled.div`
  display: flex;
`;

const Bubbles = ({
  panels, openedPanel, updatedPanels, handler,
}) => {
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

Bubbles.defaultProps = {
  panels: {
    chat: {
      icon: <div />,
      listener: 'default',
    },
    score: {
      icon: <div />,
      listener: 'default',
    },
  },
  openedPanel: 'score',
  updatedPanels: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handler: () => { },
};

Bubbles.propTypes = {
  panels: PropTypes.shape({
    chat: PropTypes.shape({
      icon: PropTypes.element,
      listener: PropTypes.string,
    }),
    score: PropTypes.shape({
      icon: PropTypes.element,
      listener: PropTypes.string,
    }),
  }),
  openedPanel: PropTypes.string,
  updatedPanels: PropTypes.arrayOf(PropTypes.string),
  handler: PropTypes.func,
};

export default Bubbles;
