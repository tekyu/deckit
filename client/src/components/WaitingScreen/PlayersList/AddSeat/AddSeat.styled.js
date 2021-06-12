import styled from "styled-components";
import Icon from "components/Generic/Icon/Icon";

export const Container = styled.div`
  margin: 0 10px 10px 10px;
  height: 200px;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const IconContainer = styled.div`
  margin-top: 40px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
`;
export const ActionIcon = styled(Icon)`
  cursor: pointer;
`;
