import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketActions } from 'store/actions';
import { roomSelectors } from 'store/selectors';
import { gameMapping } from 'utils/gameMapping';
import ScorePanel from './panels/score/ScorePanel';
import ChatPanel from './panels/chat/ChatPanel';
import OptionsPanel from './panels/options/OptionsPanel';
import Bubbles from './Bubbles/Bubbles';
import * as Styled from './SidePanel.styled';

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const SidePanel = (): JSX.Element => {
  const gameCode = useSelector(roomSelectors.gameCode);
  const [panels, setPanels] = useState<any>({});
  const [
    openedPanel, setOpenedPanel,
  ] = useState<string>(Object.keys(panels)[0]); // Object.keys(panels)[0]
  const [updatedPanels, setUpdatedPanels] = useState<string[]>([]);
  const dispatch = useDispatch();

  interface IPanelMapping {
    [key: string]: React.ReactNode
  }

  const panelMapping: IPanelMapping = {
    score: <ScorePanel />,
    chat: <ChatPanel />,
    options: <OptionsPanel />,
  };

  useEffect(() => {
    if (gameCode) {
      // @ts-ignore
      setPanels(gameMapping[gameCode].panels);
      // @ts-ignore
      setOpenedPanel(Object.keys(gameMapping[gameCode].panels)[0]);
    }
  }, [gameCode]);

  const addPanelListeners = useCallback(() => {
    Object.keys(panels).forEach((panel) => {
      dispatch(
        socketActions.listener(panels[panel].listener, () => {
          setUpdatedPanels((oldPanels) => {
            if (oldPanels.indexOf(panel) === -1) {
              return [...oldPanels, panel];
            }
            return oldPanels;
          });
        }),
      );
    });
  }, [dispatch, panels]);

  useEffect(() => {
    addPanelListeners();
  }, [addPanelListeners]);

  const changePanel = useCallback(({ target }) => {
    const panelName = target.getAttribute('name');
    setOpenedPanel(panelName);
    if (updatedPanels.indexOf(panelName) !== -1) {
      setUpdatedPanels((oldPanels) => oldPanels.filter((panel) => panel !== panelName));
    }
  }, [updatedPanels]);

  const getPanel = (): React.ReactNode => panelMapping[openedPanel];

  return (
    <Styled.Container>
      <Bubbles
        panels={panels}
        openedPanel={openedPanel}
        updatedPanels={updatedPanels}
        // @ts-ignore
        handler={changePanel}
      />
      <Styled.Panel>{getPanel()}</Styled.Panel>
    </Styled.Container>
  );
};

export default SidePanel;
