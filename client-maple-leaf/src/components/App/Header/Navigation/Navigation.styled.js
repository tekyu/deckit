import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  margin-right: 20px;
  margin-left: 60px;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  li {
    padding: 4px;
    margin: 0 15px;
    a {
      font-size: 16px;
    }
  }
`;

export const FastGameContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ComingSoon = styled.span`
  text-transform: uppercase;
  background: #009bff;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  letter-spacing: 0.02;
  margin-left: 10px;
`;

export const Link = styled.span`
  color: rgba(0, 0, 0, 0.26);
  position: relative;
  cursor: pointer;
`;
