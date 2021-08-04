import styled from 'styled-components';
import Icon from 'components/Generic/Icon/Icon';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 140px;
  height: 200px;
  margin: 0 10px 10px 10px;
`;

export const UserIcon = styled.div`
  background: ${({ color }) => color};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: relative;
  margin-top: 20px;
  transition: box-shadow 0.1s ease-in-out;
  ${({ isPlayerReady }) => isPlayerReady
    && `
    box-shadow: 0px 0px 60px 5px #68CAA0;
  `}
`;

export const RemoveIcon = styled(Icon)`
  background: #cb3066;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  padding: 2px;
  top: 5px;
  left: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in;
  &:focus,
  &:hover {
    box-shadow: 0px 0px 7px 0px rgba(80, 19, 40, 0.28);
  }
`;

export const Username = styled.h3`
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  font-family: "Catamaran";
  margin-bottom: 20px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

export const AdminCrown = styled(Icon)`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const You = styled(Icon)`
  background: ${({ color }) => color};
  border-radius: 50px;
  position: absolute;
  padding: 2px;
  top: 5px;
  left: 5px;
`;
