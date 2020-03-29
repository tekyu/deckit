import React from "react";

const StageMessage = ({ stage }) => {
  switch (stage) {
    case 3:
      return <p>Choose your card that fits best to the hint</p>;
    case 4:
      return <p>{`Choose the card you think is hinter's`}</p>;
    default:
      return <p>{`You shouldn't be able to see this. Stage: ${stage}`}</p>;
  }
};

export default StageMessage;
