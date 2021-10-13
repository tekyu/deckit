import styled from 'styled-components';

export const Container = styled.div`
min-width: 320px;
width: 320px;
box-sizing: border-box;
display: flex;
flex-direction: column;
`;

export const Panel = styled.div`
background: white;
border-radius: 6px;
box-sizing: border-box;
width: 100%;
height: 100%;
padding: 12px;
box-shadow: -10px 5px 15px rgba(207, 119, 243, 0.1),
  5px 5px 15px rgba(0, 155, 255, 0.1), -10px 5px 15px rgba(42, 201, 219, 0.1);
`;
