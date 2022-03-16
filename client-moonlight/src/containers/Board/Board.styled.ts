import { Message } from 'components/Message/Message.styled';
import styled from 'styled-components';

export const Board = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-bottom: 204px;
  ${Message} {
    justify-self: flex-start;
    margin-bottom: auto;
  }
`;

export const Cards = styled.div`
  width: 100%;

  .keen-slider {
    justify-content: center;
  }
  .keen-slider__slide {
    display: flex;
    justify-content: center;
    min-height: auto;
  }
`;

export const MockCard = styled.div`
  width: 400px;
  height: 240px;
  background: pink;
`;

export const MessagesContainer = styled.div`
  position: absolute;
  top: 0;
`;
