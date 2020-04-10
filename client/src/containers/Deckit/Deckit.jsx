import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deckitActions } from "store/actions";
import { deckitSelectors, roomSelectors, userSelectors } from "store/selectors";
import SidePanel from "../GameContainer/SidePanel/SidePanel";
import Hand from "./components/Hand/Hand";
import PickingArea from "./components/PickingArea/PickingArea";
import Message from "./components/Message/Message";
import HintInput from "../../components/HintInput/HintInput";
import { gameMapping } from "../../utils/gameMapping";

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledTableContainer = styled.div`
  position: relative;
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledTable = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  margin-bottom: 10px;
`;

const StyledGame = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Deckit = () => {
  const activeRoom = useSelector(roomSelectors.activeRoom);
  const userId = useSelector(userSelectors.userId);
  const hinter = useSelector(deckitSelectors.hinter);
  const hint = useSelector(deckitSelectors.hint);
  const hintCard = useSelector(deckitSelectors.myCard);
  const stage = useSelector(deckitSelectors.gameStage);
  const dispatch = useDispatch();
  const [panels, setPanels] = useState({});

  useEffect(() => {
    if (activeRoom && activeRoom.state >= 2) {
      const { gameCode, id } = activeRoom;
      setPanels(gameMapping[gameCode].panels);
    }
  }, [activeRoom]);

  useEffect(() => {
    if (stage === 5) {
      dispatch(deckitActions.resetOptionsForNextRound());
    }
  }, [dispatch, stage]);
  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledGame>
          <Message />
          {hintCard && !hint && activeRoom && userId === hinter.id && (
            <HintInput />
          )}
          <PickingArea />
        </StyledGame>
        {activeRoom && activeRoom.state >= 2 && Object.keys(panels).length && (
          <SidePanel panels={panels} />
        )}
      </StyledTable>
      {<Hand />}
    </StyledTableContainer>
  );
};

export default Deckit;
