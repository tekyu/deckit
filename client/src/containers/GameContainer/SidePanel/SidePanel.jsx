import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
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

const SidePanel = ({ panels }) => {
  const [openedPanel, setOpenedPanel] = useState(`score`); // Object.keys(panels)[0]
  const [updatedPanels, setUpdatedPanels] = useState([]);
  const dispatch = useDispatch();
  const panelMapping = {
    score: <ScorePanel />,
    chat: <ChatPanel />,
    options: <OptionsPanel />
  };

  const addPanelListeners = useCallback(() => {
    Object.keys(panels).forEach(panel => {
      dispatch(
        listener(panels[panel].listener, newData => {
          console.log(
            `%c addPanelListeners ${panel}`,
            `background: #E88341`,
            newData,
            panel,
            openedPanel
          );
          setUpdatedPanels(oldPanels => {
            if (oldPanels.indexOf(panel) === -1) {
              return [...oldPanels, panel];
            }
            return oldPanels;
          });
        })
      );
    });
  }, []);

  useEffect(() => {
    addPanelListeners();
  }, []);

  const changePanel = useCallback(({ target }) => {
    console.log(`changePanel`, target);
    const panelName = target.getAttribute(`name`);
    setOpenedPanel(panelName);
    if (updatedPanels.indexOf(panelName) !== -1) {
      setUpdatedPanels(oldPanels => {
        return oldPanels.filter(panel => panel !== panelName);
      });
    }
  });

  const getPanel = () => {
    return panelMapping[openedPanel];
  };

  return (
    <Container>
      <div>{updatedPanels}</div>
      <Bubbles
        panels={panels}
        openedPanel={openedPanel}
        updatedPanels={updatedPanels}
        handler={changePanel}
      />
      <Panel>{getPanel()}</Panel>
    </Container>
  );
};

export default SidePanel;
