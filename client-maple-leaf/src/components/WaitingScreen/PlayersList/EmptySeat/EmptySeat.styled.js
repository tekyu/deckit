import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from 'components/Generic/Icon/Icon';

export const Container = styled.div`
  margin: 0 10px 10px 10px;
  height: 200px;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const IconContainer = styled.div`
  margin-top: 20px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
`;

export const UserIcon = styled(Icon)`
  opacity: 0.4;
`;

export const RemoveIcon = styled(DeleteIcon)`
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
