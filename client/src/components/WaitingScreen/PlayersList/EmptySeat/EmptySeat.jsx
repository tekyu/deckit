import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Icon from "../../../Generic/Icon/Icon";
import { removeSeat } from "../../../../store/room/roomActions";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledContainer = styled.div`
  margin: 0 10px 10px 10px;
  height: 200px;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledIconContainer = styled.div`
  margin-top: 20px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
`;

const StyledIcon = styled(Icon)`
  opacity: 0.4;
`;

const StyledRemoveIcon = styled(DeleteIcon)`
  background: #ffffff;
  color: #cb3066;
  border-radius: 100%;
  position: absolute;
  width: 25px;
  height: 25px;
  padding: 2px;
  top: 10px;
  right: 12px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in;
  z-index: 1;
  &:focus,
  &:hover {
    box-shadow: 0px 0px 7px 0px rgba(80, 19, 40, 0.28);
  }
`;

const EmptySeat = ({ key, isAdmin, roomId }) => {
  const dispatch = useDispatch();
  const removeEmptySeatHandler = () => {
    dispatch(removeSeat(roomId));
  };
  return (
    <StyledContainer key={key}>
      <StyledIconContainer>
        {isAdmin && <StyledRemoveIcon onClick={removeEmptySeatHandler} />}
        <StyledIcon icon="user" size={100} />
      </StyledIconContainer>
      {/* {isAdmin && <button>Invite</button>} */}
    </StyledContainer>
  );
};

export default EmptySeat;
