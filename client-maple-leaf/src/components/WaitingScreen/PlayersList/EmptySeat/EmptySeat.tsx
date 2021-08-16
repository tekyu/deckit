import React from 'react';
import { useDispatch } from 'react-redux';
import { removeSeat } from 'store/room/roomActions';
import * as Styled from './EmptySeat.styled';

interface IEmptySeat {
  isAdmin?: boolean;
  roomId: string;
}

const EmptySeat = ({ isAdmin = false, roomId }: IEmptySeat): JSX.Element => {
  const dispatch = useDispatch();

  const removeEmptySeatHandler = () => {
    dispatch(removeSeat(roomId));
  };

  return (
    <Styled.Container>
      <Styled.IconContainer>
        {isAdmin && <Styled.RemoveIcon onClick={removeEmptySeatHandler} />}
        <Styled.UserIcon icon="user" size={100} />
      </Styled.IconContainer>
    </Styled.Container>
  );
};

export default EmptySeat;
