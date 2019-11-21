import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { listener } from "store/actions";
import ScorePanel from "./panels/score/ScorePanel";
import ChatPanel from "./panels/chat/ChatPanel";
import OptionsPanel from "./panels/options/OptionsPanel";
import Bubbles from "./Bubbles/Bubbles";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  background: blue;
  min-width: 320px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Panel = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12px;
`;

const SidePanel = ({ panels, listener }) => {
  const [openedPanel, setOpenedPanel] = useState(`chat`); // Object.keys(panels)[0]
  const [sidePanels, setSidePanels] = useState({});
  const panelMapping = {
    score: <ScorePanel scoreData={sidePanels.score} />,
    chat: <ChatPanel chatData={sidePanels.chat} />,
    options: <OptionsPanel />
  };
  const addPanelListeners = useCallback(() => {
    console.log(`%c addPanelListeners`, `background: #E88341`);

    Object.keys(panels).forEach(panel => {
      listener(panels[panel].listener, data => {
        setSidePanels(prevSidePanels => ({
          ...prevSidePanels,
          [panel]: panels[panel]
        }));
      });
    });
  }, [listener, panels]);

  const makePanels = useCallback(() => {
    console.log(`%c makePanels`, `background: #FF4762`);
    Object.keys(panels).forEach(panel => {
      setSidePanels(prevSidePanels => ({
        ...prevSidePanels,
        [panel]: panels[panel]
      }));
    });
  }, [panels]);

  useEffect(() => {
    makePanels();
    addPanelListeners();
  }, [makePanels, addPanelListeners]);

  const changePanel = useCallback(({ target }) => {
    console.log(`changePanel`, target);
    setOpenedPanel(target.getAttribute(`name`));
  });

  const getPanel = () => {
    return panelMapping[openedPanel];
  };

  return (
    <Container>
      <Bubbles
        panels={panels}
        openedPanel={openedPanel}
        handler={changePanel}
      />
      <Panel>{getPanel()}</Panel>
    </Container>
  );
};

const mapDispatchToProps = { listener };
export default connect(
  null,
  mapDispatchToProps
)(SidePanel);
