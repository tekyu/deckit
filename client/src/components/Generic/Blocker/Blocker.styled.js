import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.4);
  color: #000;
  z-index: 1000;
`;

export const Message = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 6px;
`;
