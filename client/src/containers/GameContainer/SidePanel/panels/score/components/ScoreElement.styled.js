import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px;
  margin: 4px 0;
  position: relative;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 0%;
    ${({ progress }) => progress
    && `
    width: ${progress}%;`}

    background-image: linear-gradient(
      35deg,
      #2ac9db -10%,
      #009bff 47%,
      #cf77f3 130%
    );
    top: 0;
    left: 0;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
`;

export const Info = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export const Username = styled.div`
  font-size: 14px;
  text-overflow: elipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 20px;
`;

export const Score = styled.div`
  font-size: 20px;
`;
