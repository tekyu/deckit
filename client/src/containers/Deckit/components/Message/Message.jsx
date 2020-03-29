import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import selectActiveRoom from "../../../../store/selectors/selectActiveRoom";
import selectGameStage from "../../../../store/deckit/selectors/selectGameStage";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";
import selectHint from "../../../../store/deckit/selectors/selectHint";
import selectUserId from "../../../../store/selectors/selectUserId";
import HinterStage from "./components/HinterStage/HinterStage";
import HintMessage from "./components/HintMessage";

const StyledContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  background: #fff;
  box-shadow: -5px 5px 15px rgba(207, 119, 243, 0.2),
    0px 5px 15px rgba(0, 155, 255, 0.2), -5px 5px 15px rgba(42, 201, 219, 0.2);
`;

// Who is hinter
// hint
// Stage info

const GetMessage = ({ stage, hinter, userId, hint }) => {
  switch (stage) {
    case 2:
      return <HinterStage hinter={hinter} userId={userId} />;
    case 3:
    case 4:
      return <HintMessage hint={hint} stage={stage} />;
    default:
      return <p>{`You shouldn't be able to see this. Stage: ${stage}`}</p>;
  }
};

const Message = () => {
  const activeRoom = useSelector(selectActiveRoom);
  const stage = useSelector(selectGameStage);
  const hinter = useSelector(selectHinter);
  const hint = useSelector(selectHint);
  const userId = useSelector(selectUserId);

  console.log("Message", stage, JSON.stringify(hinter), hint, userId);

  return (
    <StyledContainer>
      <GetMessage stage={stage} hint={hint} hinter={hinter} userId={userId} />
    </StyledContainer>
  );
};

export default Message;
