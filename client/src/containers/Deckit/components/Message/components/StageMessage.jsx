import React from "react";
import PropTypes from "prop-types";

const StageMessage = ({ stage, isHinter }) => {
  switch (stage) {
    case 3:
      if (isHinter) {
        return <p>Others are choosing their cards. Please wait</p>;
      }
      return <p>Choose your card that fits best to the hint</p>;
    case 4:
      if (isHinter) {
        return <p>Others are choosing their cards. Please wait</p>;
      }
      return <p>{`Choose the card you think is hinter's`}</p>;
    case 5:
      return <p>{`Next round will start shortly`}</p>;
    default:
      return <p>{`You shouldn't be able to see this. Stage: ${stage}`}</p>;
  }
};

StageMessage.propTypes = {
  stage: PropTypes.number,
  isHinter: PropTypes.bool
};

export default StageMessage;
