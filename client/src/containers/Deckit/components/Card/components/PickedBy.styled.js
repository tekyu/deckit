import styled from "styled-components";
import PlayerBubble from "components/Generic/PlayerBubble/PlayerBubble";

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28);
  padding: 10px;
  border-radius: 6px;
  text-align: right;
  justify-content: flex-end;
  align-self: flex-end;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const BubblesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 6px;
`;

export const Bubble = styled(PlayerBubble)`
  margin: 4px -6px;
`;
