import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ms from "pretty-ms";
import Icon from "components/Generic/Icon/Icon";
import * as Styled from "./Timer.styled";

const Timer = ({ time }) => {
  const [timeElapsed, setTimeElapsed] = useState(+time * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((time) => time - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Styled.Container>
      <Icon icon="timer" size={20} />
      <Styled.Time>{ms(timeElapsed, { colonNotation: true })}</Styled.Time>
    </Styled.Container>
  );
};

Timer.defaultProps = {
  time: 3,
};

Timer.propTypes = {
  time: PropTypes.number,
};

export default Timer;
