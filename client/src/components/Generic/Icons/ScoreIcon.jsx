import React from "react";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as ScoreIconSvg } from "../../../assets/icons/freepick/score.svg";

const ScoreIcon = props => {
  console.log("ScoreIcon", props);
  return (
    <SvgIcon
      {...props}
      component={ScoreIconSvg}
      viewBox="0 -51 512.00202 512"
    />
  );
};

export default ScoreIcon;
