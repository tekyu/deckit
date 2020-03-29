import styled from "styled-components";

const $Button = styled.button`
  background-image: linear-gradient(
    35deg,
    #2ac9db 0%,
    #009bff 47%,
    #cf77f3 120%
  );
  border: 0;
  cursor: pointer;
  font-family: "Hammersmith One";
  font-size: 14px;
  letter-spacing: 0.04em;
  padding: 14px 21px;
  ${props => props.styles}
`;

export default $Button;
