import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeSeat } from "store/room/roomActions";
import * as Styled from './EmptySeat.styled';

const EmptySeat = ({ isAdmin, roomId }) => {
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

EmptySeat.defaultProps = {
  isAdmin: false,
  roomId: ``,
};

EmptySeat.propTypes = {
  isAdmin: PropTypes.bool,
  roomId: PropTypes.string,
};

export default EmptySeat;
