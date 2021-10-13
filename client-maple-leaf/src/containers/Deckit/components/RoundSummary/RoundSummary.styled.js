import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: auto;
  position: relative;
`;

export const Hand = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

export const CardContainer = styled.div`
  transition: all 0.3s ease-in-out;
  position: relative;
  margin: 0 2px;
`;

export const HintMessage = styled.div`
  padding: 7px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28);
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;
