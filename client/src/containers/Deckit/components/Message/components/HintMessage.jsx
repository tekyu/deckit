import React from "react";
import StageMessage from "./StageMessage";

const HintMessage = ({ hint, stage, isHinter }) => {
  return (
    <div>
      <h3>
        Hint: <span>{hint}</span>
      </h3>
      <StageMessage stage={stage} isHinter={isHinter} />
    </div>
  );
};

export default HintMessage;
