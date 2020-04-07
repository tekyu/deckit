import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SidePanel from "../GameContainer/SidePanel/SidePanel";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import selectHinter from "../../store/deckit/selectors/selectHinter";
import selectHint from "../../store/deckit/selectors/selectHint";
import Hand from "./components/Hand/Hand";
import selectUserId from "../../store/selectors/selectUserId";
import { resetOptionsForNextRound } from "../../store/deckit/deckitActions";
import PickingArea from "./components/PickingArea/PickingArea";
import Message from "./components/Message/Message";
import selectMyCard from "../../store/deckit/selectors/selectMyCard";
import HintInput from "../../components/HintInput/HintInput";
import selectGameStage from "../../store/deckit/selectors/selectGameStage";
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
  const activeRoom = useSelector(selectActiveRoom);
  const userId = useSelector(selectUserId);
  const hinter = useSelector(selectHinter);
  const hint = useSelector(selectHint);
  const hintCard = useSelector(selectMyCard);
  const stage = useSelector(selectGameStage);
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
      dispatch(resetOptionsForNextRound());
    }
  }, [stage]);
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
