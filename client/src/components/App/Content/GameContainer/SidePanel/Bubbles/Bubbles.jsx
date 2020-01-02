import React, { memo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Styled from "./Bubbles.styled";

const Bubbles = ({ handler, openedPanel, panels }) => {
  return (
    <Styled.Container>
      {panels.map(panel => (
        <Styled.Bubble
          key={panel.key}
          name={panel.key}
          color={panel.color}
          isOpen={panel.key === openedPanel}
          onClick={() => handler(panel.key)}
        >
          <FontAwesomeIcon color={panel.iconColor} icon={panel.icon} />
        </Styled.Bubble>
      ))}
    </Styled.Container>
  );
};

Bubbles.propTypes = {
  handler: PropTypes.func.isRequired,
  openedPanel: PropTypes.string.isRequired,
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.string.isRequired,
      iconColor: PropTypes.string,
      key: PropTypes.string.isRequired
    })
  )
};

export default memo(Bubbles);
