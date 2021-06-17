import styled from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

export const CardsPicked = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
span {
  font-size: 12px;
  &:last-of-type {
    margin-left: 6px;
  }
}
`;

export const RemainingCards = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
span {
  margin-right: 6px;
}
`;
