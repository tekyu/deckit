import { Increment } from 'components/Increment/Increment.styled';
import { SimpleSwitch } from 'components/SimpleSwitch/SimpleSwitch.styled';
import styled from 'styled-components';

export const RoomSettings = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Points = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${Increment} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export const Visibility = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${SimpleSwitch} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;
