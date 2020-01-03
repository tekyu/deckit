import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import ChatPanel from "./panels/chat/ChatPanel";
import Bubbles from "./Bubbles/Bubbles";
import { panels } from "./SidePanel.config";
import * as Styled from "./SidePanel.styled";

const SidePanel = () => {
  const [openedPanel, setOpenedPanel] = useState(panels[0].key);
  const changePanel = useCallback(key => {
    const newOpened = panels.find(element => element.key === key);
    setOpenedPanel(newOpened.key);
  }, []);

  return (
    <Styled.Container>
      <Bubbles
        openedPanel={openedPanel}
        panels={panels}
        handler={changePanel}
      />
      <ChatPanel></ChatPanel>
    </Styled.Container>
  );
};

const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SidePanel);
