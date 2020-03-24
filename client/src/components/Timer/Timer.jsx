import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ms from "pretty-ms";
import Icon from "../Generic/Icon/Icon";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 60px;
`;

const StyledTime = styled.span`
  margin-left: 6px;
`;

const Timer = ({ time = 3 }) => {
  const [timeElapsed, setTimeElapsed] = useState(+time * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(time => time - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledContainer>
      <Icon icon="timer" size={20} />
      <StyledTime>{ms(timeElapsed, { colonNotation: true })}</StyledTime>
    </StyledContainer>
  );
};

export default Timer;
