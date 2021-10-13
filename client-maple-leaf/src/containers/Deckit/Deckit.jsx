import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deckitActions } from 'store/actions';
import { deckitSelectors, roomSelectors, userSelectors } from 'store/selectors';
import HintInput from 'components/HintInput/HintInput';
import { gameMapping } from 'utils/gameMapping';
import SidePanel from 'containers/GameContainer/SidePanel/SidePanel';
import Hand from './components/Hand/Hand';
import PickingArea from './components/PickingArea/PickingArea';
import Message from './components/Message/Message';
import Winners from './components/Winners/Winners';
import * as Styled from './Deckit.styled';

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

// TODO: change to tsx
const Deckit = () => {
  const activeRoom = useSelector(roomSelectors.activeRoom);
  const winners = useSelector(roomSelectors.winners);
  const userId = useSelector(userSelectors.userId);
  const hinter = useSelector(deckitSelectors.hinter);
  const hint = useSelector(deckitSelectors.hint);
  const hintCard = useSelector(deckitSelectors.myCard);
  const stage = useSelector(deckitSelectors.gameStage);
  const dispatch = useDispatch();
  const [panels, setPanels] = useState({});

  useEffect(() => {
    if (activeRoom && activeRoom.state >= 2) {
      const { gameCode } = activeRoom;
      setPanels(gameMapping[gameCode].panels);
    }
  }, [activeRoom]);

  useEffect(() => {
    if (stage === 2) {
      dispatch(deckitActions.resetOptionsForNextRound());
    }
  }, [dispatch, stage]);
  return (
    <Styled.TableContainer>
      {winners && winners.length > 0 && <Winners />}
      <Styled.Table>
        <Styled.Game>
          <Message />
          {hintCard && !hint && activeRoom && userId === hinter.id && (
            <HintInput />
          )}
          <PickingArea />
        </Styled.Game>
        {activeRoom && activeRoom.state >= 2 && Object.keys(panels).length && (
          <SidePanel panels={panels} />
        )}
      </Styled.Table>
      <Hand />
    </Styled.TableContainer>
  );
};

export default Deckit;
