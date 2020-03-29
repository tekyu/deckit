import React from "react";
import StageMessage from "./StageMessage";

const HintMessage = ({ hint, stage }) => {
  return (
    <div>
      <h3>
        Hint: <span>{hint}</span>
      </h3>
      <StageMessage stage={stage} />
    </div>
  );
};

export default HintMessage;
