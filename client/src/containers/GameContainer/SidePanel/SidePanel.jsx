import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "store/actions";
import ScorePanel from "./panels/score/ScorePanel";
import ChatPanel from "./panels/chat/ChatPanel";
import OptionsPanel from "./panels/options/OptionsPanel";
import Bubbles from "./Bubbles/Bubbles";
import { roomSelectors } from "store/selectors";
import { gameMapping } from "../../../utils/gameMapping";

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const Container = styled.div`
  min-width: 320px;
  width: 320px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Panel = styled.div`
  background: white;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12px;
  box-shadow: -10px 5px 15px rgba(207, 119, 243, 0.1),
    5px 5px 15px rgba(0, 155, 255, 0.1), -10px 5px 15px rgba(42, 201, 219, 0.1);
`;

const SidePanel = () => {
  const gameCode = useSelector(roomSelectors.gameCode);
  const [panels, setPanels] = useState({});
  const [openedPanel, setOpenedPanel] = useState(Object.keys(panels)[0]); // Object.keys(panels)[0]
  const [updatedPanels, setUpdatedPanels] = useState([]);
  const dispatch = useDispatch();
  const panelMapping = {
    score: <ScorePanel />,
    chat: <ChatPanel />,
    options: <OptionsPanel />
  };

  useEffect(() => {
    console.log(`useEffect`, gameCode);
    if (gameCode) {
      setPanels(gameMapping[gameCode].panels);
      setOpenedPanel(Object.keys(gameMapping[gameCode].panels)[0]);
    }
  }, [gameCode]);

  const addPanelListeners = useCallback(() => {
    Object.keys(panels).forEach(panel => {
      dispatch(
        socketActions.listener(panels[panel].listener, newData => {
          setUpdatedPanels(oldPanels => {
            if (oldPanels.indexOf(panel) === -1) {
              return [...oldPanels, panel];
            }
            return oldPanels;
          });
        })
      );
    });
  }, [dispatch, panels]);

  useEffect(() => {
    addPanelListeners();
  }, [addPanelListeners]);

  const changePanel = useCallback(
    ({ target }) => {
      const panelName = target.getAttribute(`name`);
      setOpenedPanel(panelName);
      if (updatedPanels.indexOf(panelName) !== -1) {
        setUpdatedPanels(oldPanels => {
          return oldPanels.filter(panel => panel !== panelName);
        });
      }
    },
    [updatedPanels]
  );

  const getPanel = () => {
    return panelMapping[openedPanel];
  };

  return (
    <Container>
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
