import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 20px 5px 100px rgba(207, 119, 243, 0.1),
    0px 5px 100px rgba(0, 155, 255, 0.1),
    -20px 5px 100px rgba(42, 201, 219, 0.1);
  border-radius: 6px;
  padding: 5px 20px 30px 20px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  font-family: "Catamaran";
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 18px;
  min-height: 60px;
`;

export const Welcome = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
`;

export const Title = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const Mode = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const ShowIdContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const ShareButton = styled(Button)`
  /* background: #16bffd; */
  border-radius: 3px;
  margin: 20px 0;
  padding: 16px 32px;
  /* box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28); */
  /* box-shadow: 20px 5px 40px #cf77f3, 0px 5px 40px #009bff,
    -20px 5px 40px #2ac9db; */
  box-shadow: 0px 5px 10px rgba(207, 119, 243, 0.3),
    0px 5px 10px rgba(0, 155, 255, 0.3), 0px 5px 10px rgba(42, 201, 219, 0.3);
  background-image: linear-gradient(
    35deg,
    #2ac9db 0%,
    #009bff 47%,
    #cf77f3 120%
  );
`;
