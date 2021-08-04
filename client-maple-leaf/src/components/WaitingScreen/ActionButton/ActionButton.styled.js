import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const ActionButton = styled(Button)`
border: 0;
background: #cb3066;
border-radius: 3px;
${({ isPlayerReady }) => isPlayerReady
    && `
  background: transparent;
  background-image: linear-gradient(
  35deg,
  #2ac9db -10%, #009bff 47%,
  #cf77f3 130%
);
  `}
font-size: 14px;
padding: 16px 32px;
letter-spacing: 0.1em;
cursor: pointer;
margin-top: 20px;
transition: all 0.3s ease-out;
box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.28);
&:focus,
&:hover,
&:active {
  box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.28);
}
`;
