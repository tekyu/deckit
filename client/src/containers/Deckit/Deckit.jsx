import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as styles from "./Deckit.module.scss";
import SidePanel from "../GameContainer/SidePanel/SidePanel";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import Hand from "./components/Hand/Hand";
import selectUserId from "../../store/selectors/selectUserId";
import { Formik, Field } from "formik";
import { sendHint } from "../../store/deckit/deckitActions";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledHinter = styled.div`
  width: 100%;
  margin: 20px;
  top: 0;
  left: 0;
  position: sticky;
  background: red;
  border-radius: 6px;
`;

// const StyledHintInput =

const Deckit = () => {
  const dispatch = useDispatch();
  const activeRoom = useSelector(selectActiveRoom);
  const userId = useSelector(selectUserId);
  return (
    <div className={styles.table}>
      <StyledHinter>
        {activeRoom && userId === activeRoom.hinter
          ? `You are choosing a hint. Field will appear after you choose a card`
          : `${activeRoom.hinter.username} is choosing a hint`}
      </StyledHinter>
      <div className={styles.draft}></div>
      {activeRoom && userId === activeRoom.hinter && (
        <Formik
          initialValues={{
            hint: ""
          }}
          onSubmit={({ hint }) => {
            console.log("sendHint", hint);
            dispatch(sendHint({ activeRoomId: activeRoom.id, hint }));
          }}
        >
          <Field name="hint" type="text" />
          {/* <input type="text" placeholder="Place your hint in here"/> */}
          <button type="submit">Give hint</button>
        </Formik>
      )}
      <Hand />
      {/* <div className={`${styles.hand}`}></div> */}
    </div>
  );
};

export default Deckit;
