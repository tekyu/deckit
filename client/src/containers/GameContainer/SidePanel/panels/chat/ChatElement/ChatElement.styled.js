import styled from "styled-components";

export const Container = styled.div`
display: flex;
margin: 7px 0;
${({ isMine }) => isMine
    && `
  text-align:right;
  justify-content: flex-end;
`}
`;

export const Display = styled.div`
position: relative;
height: 100%;
width: 40px;
padding-right: 5px;
margin-top: 16px;
${({ isMine }) => isMine
    && `
  display: none;
`}
`;

export const AvatarContainer = styled.div`
width: 30px;
height: 0;
margin: 0 auto;
padding-bottom: 30px;
position: relative;
border-radius: 50%;
overflow: hidden;
  span {
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`;

export const Info = styled.div`
display: flex;
flex-direction: column;
align-items: ${({ isMine }) => (isMine ? `flex-end` : `flex-start`)};
width: 100%;
`;

export const Message = styled.p`
width: auto;
height: auto;
padding: 7px 12px;
border-radius: 15px;
background: #009bff;
color: white;
`;

export const Author = styled.label`
text-transform: capitalize;
margin-left: 12px;
margin: 0px 12px 3px 12px;
margin-bottom: 3px;
font-size: 12px;
`;

export const Timestamp = styled.label`
margin: 4px 12px 0 12px;
font-size: 10px;
color: rgba(0, 0, 0, 0.54);
`;
